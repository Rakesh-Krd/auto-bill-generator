import { useState } from "react";
import API from "../../utils/api";

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, company } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("company", JSON.stringify(company));
      onLoginSuccess({ token, ...company });

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-bold text-blue-600">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn-blue w-full">Login</button>
      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={onSwitchToSignup}>
          Signup
        </span>
      </p>
    </form>
  );
};

export default Login;
