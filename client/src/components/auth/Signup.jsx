import { useState } from "react";

const Signup = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await API.post("/auth/signup", formData);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("company", JSON.stringify(res.data.company));
    window.location.href = "/dashboard"; // or bill generator page
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <form onSubmit={handleSignup} className="p-6 bg-white rounded-xl shadow-md space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold text-blue-600">Signup</h2>
      <input
        type="text"
        placeholder="Company Name"
        className="input"
        value={formData.companyName}
        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="input"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        required
      />
      <button type="submit" className="btn-blue w-full">Signup</button>
      <p className="text-sm text-gray-500 text-center">
        Already have an account? <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>Login</span>
      </p>
    </form>
  );
};

export default Signup;
