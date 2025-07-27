import { useState } from "react";
import API from "../../utils/api";

const Signup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyGST: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/signup", {
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        companyGST: formData.companyGST,
        email: formData.email,
        password: formData.password,
      });

      alert("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/verify-otp", {
        email: formData.email,
        code: otp,
      });

      setSuccessMsg("Email verified successfully. Redirecting to login...");

      setTimeout(() => {
        onSwitchToLogin(); // ✅ Switch to login after 3 seconds
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-600">Signup</h2>

      {successMsg && (
        <div className="text-green-600 font-medium text-sm">{successMsg}</div>
      )}

      {!otpSent ? (
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            className="input"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company Address"
            className="input"
            value={formData.companyAddress}
            onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company GST (optional)"
            className="input"
            value={formData.companyGST}
            onChange={(e) => setFormData({ ...formData, companyGST: e.target.value })}
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
          <button type="submit" className="btn-blue w-full">Send OTP</button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={onSwitchToLogin}>
              Login
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <p className="text-gray-700 text-sm">
            Enter the OTP sent to <strong>{formData.email}</strong>
          </p>
          <input
            type="text"
            className="input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="btn-blue w-full">Verify OTP</button>
          <p className="text-sm text-center text-gray-600">
            Didn't receive OTP?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={handleSignup}>
              Resend
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Signup;
