import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import BillForm from "./components/BillForm";
import BillPreview from "./components/BillPreview";
import ButtonsBar from "./components/ButtonBar";
import AuthPage from "./components/pages/AuthPage";
import BillHistory from "./components/BillHistory";
import "./index.css";
import API from "./utils/api";

const App = () => {
  const [bill, setBill] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("TemplateA");
  const [showLogin, setShowLogin] = useState(false);
  const [company, setCompany] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const previewRef = useRef();

  // ✅ Fetch company profile on first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    API.get("/company/profile")
      .then((res) => {
        const data = res.data;
        if (data && data.companyName) {
          setCompany(data);
          localStorage.setItem("company", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch company:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("company");
      });
  }, []);

  // ✅ On successful login/signup
  const handleLoginSuccess = async (companyData) => {
    if (!companyData?.token) return;

    const token = companyData.token;
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const res = await API.get("/company/profile");
      const fullCompany = res.data;
      setCompany(fullCompany);
      localStorage.setItem("company", JSON.stringify(fullCompany));
    } catch (err) {
      console.error("Login succeeded but failed to fetch profile:", err);
      alert("Login succeeded but profile fetch failed.");
    }

    setShowLogin(false);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    setCompany(null);
    setBill({});
    setShowHistory(false);
  };

  // ✅ Show history (only if logged in)
  const handleViewHistory = () => {
  if (!company) return alert("Login required to view bill history!");
  setShowHistory(true); // show the modal
};

  return (
    <div className="min-h-screen bg-blue-50">
      <Header
        company={company}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        onViewHistory={handleViewHistory}
      />

      {showLogin && (
        <AuthPage
          onAuthSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      <main className="p-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {showHistory ? (
          <BillHistory onBack={() => setShowHistory(false)} />
        ) : (
          <>
            <div className="flex-1">
              <BillForm
                key={company ? "logged-in" : "guest"}
                onBillChange={setBill}
                company={company}
              />
              <ButtonsBar
                previewRef={previewRef}
                bill={bill}
                company={company}
                setCompany={setCompany}
              />
            </div>
           <div className="flex-1" id="printable-area" ref={previewRef}>
  <div className="mb-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Select Template:
    </label>
    <select
      value={selectedTemplate}
      onChange={(e) => setSelectedTemplate(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="TemplateA">Template A</option>
      <option value="TemplateB">Template B</option>
      <option value="TemplateC">Template C</option>
      <option value="TemplateD">Template D</option>
      <option value="TemplateE">Template E</option>
      <option value="TemplateF">Template F</option>
      <option value="TemplateG">Template G</option>
    </select>
    <h2 className="text-lg font-bold text-blue-600 mb-4">
        Bill Preview 
      </h2>
  </div>

  <BillPreview bill={bill} template={selectedTemplate} />
</div>

          </>
        )}
      </main>
       {showHistory && <BillHistory onClose={() => setShowHistory(false)} />}
    </div>
  );
};

export default App;
