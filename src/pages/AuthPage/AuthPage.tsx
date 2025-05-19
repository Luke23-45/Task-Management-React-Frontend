import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
function AuthPage() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {isLoginFormVisible ? "Login" : "Register"}
      </h2>
      {isLoginFormVisible ? <LoginForm /> : <RegisterForm />}{" "}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        {isLoginFormVisible
          ? "Don't have an account?"
          : "Already have an account?"}
        <button
          onClick={toggleForm}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            marginLeft: "5px",
          }}
        >
          {isLoginFormVisible ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
