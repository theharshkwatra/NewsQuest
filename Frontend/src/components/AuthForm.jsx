import React from "react";

export default function AuthForm({ isLogin }) {
  return (
    <form className="auth-form">
      {!isLogin && (
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" />
        </div>
      )}

      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="your.email@example.com" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="********" />
        {isLogin && <a href="#" className="forgot-link">Forgot password?</a>}
      </div>

      {!isLogin && (
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="********" />
        </div>
      )}

      <button type="submit" className="submit-btn">
        {isLogin ? "Sign In" : "Create Account"}
      </button>

      <div className="divider">OR CONTINUE WITH</div>

      <button type="button" className="google-btn">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
        />
        {isLogin ? "Sign in with Google" : "Sign up with Google"}
      </button>
    </form>
  );
}
