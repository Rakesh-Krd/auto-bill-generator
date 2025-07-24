import { useState } from "react";

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Call login API
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-white rounded-xl shadow-md space-y-4 w-full max-w-md">
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
      <p className="text-sm text-gray-500 text-center">
        Don’t have an account? <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>Signup</span>
      </p>
    </form>
  );
};

export default Login;
