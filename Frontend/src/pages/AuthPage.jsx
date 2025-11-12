import React, { useState } from "react";
import "./AuthPage.css";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>NEWS QUEST</h2>
          <p>REAL-TIME INTELLIGENCE</p>

          <div className="auth-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
        </div>

        <AuthForm isLogin={isLogin} />
      </div>
    </div>
  );
}
