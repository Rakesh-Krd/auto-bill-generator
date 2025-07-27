import { useState } from "react";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

const AuthPage = ({ onAuthSuccess, onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        {showLogin ? (
          <Login
            onSwitchToSignup={() => setShowLogin(false)}
            onLoginSuccess={onAuthSuccess}
          />
        ) : (
          <Signup
            onSwitchToLogin={() => setShowLogin(true)}
            onSignupSuccess={onAuthSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
