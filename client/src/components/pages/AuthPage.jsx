import { useState } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      {showLogin ? <Login onSwitch={() => setShowLogin(false)} /> : <Signup onSwitch={() => setShowLogin(true)} />}
    </div>
  );
};

export default AuthPage;
