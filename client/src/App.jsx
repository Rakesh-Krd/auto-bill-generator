import React, { useState,useRef } from "react";
import Header from "./components/Header";
import BillForm from "./components/BillForm";
import BillPreview from "./components/BillPreview";
import './index.css';
import ButtonsBar from "./components/ButtonBar";

const App = () => {
  const [bill, setBill] = useState({});
  const previewRef = useRef();
  const [selectedTemplate, setSelectedTemplate] = useState("TemplateA");

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <BillForm onBillChange={setBill} />
          <ButtonsBar previewRef={previewRef} bill={bill}/>
        </div>
        <div className="flex-1" id="printable-area" ref={previewRef}>
          <BillPreview  bill={bill} selectedTemplate={selectedTemplate} onTemplateChange={setSelectedTemplate} />
        </div>
      </main>
    </div>
  );
};

export default App;
