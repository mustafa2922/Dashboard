import React, { useState } from "react";

const Login = () => {
  const [active, setActive] = useState(false);

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  return (
    <div id="container" className={active ? "active" : "close"}>
      <div className="login">
        <div className="content">
          <h1>Log In</h1>
          <form>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <span className="remember">Remember me</span>
            <span className="forget">Forgot password?</span>
            <span className="clearfix"></span>
            <button onClick={handleRegisterClick}>Log In</button>
          </form>
          <span className="loginwith">Or Connect with</span>
          <a href="https://www.facebook.com/emin.qasimovdia">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          {/* Add other social media icons */}
        </div>
      </div>
      <div className="page front">{/* Add content for front page */}</div>
      <div className="page back">{/* Add content for back page */}</div>
      <div className="register">{/* Add content for register page */}</div>
    </div>
  );
};

export default Login;
