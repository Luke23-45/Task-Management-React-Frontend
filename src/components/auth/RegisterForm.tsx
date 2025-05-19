import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { registerUser } from "@/api/mutations/authMutaton";
import { type RegisterPayload, type User } from "@/types/auth";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterPayload) => registerUser(userData),
    onSuccess: (data: User) => {
      console.log("Registration successful:", data);

      setMessage({
        type: "success",
        text: "Registration successful! You can now log in.",
      });

      setFullName("");
      setEmail("");
      setPassword("");
    },
    onError: (err: any) => {
      console.error("Registration error:", err);

      const errorMessage =
        err.response?.data?.email?.[0] ||
        err.response?.data?.detail ||
        err.message ||
        "An unexpected error occurred during registration.";
      setMessage({ type: "error", text: errorMessage });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    registerMutation.mutate({ full_name: fullName, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
    >
      <div>
        <label
          htmlFor="full_name"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Full Name:
        </label>
        <input
          id="full_name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <div>
        <label
          htmlFor="register-email"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Email:
        </label>{" "}

        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <div>
        <label
          htmlFor="register-password"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Password:
        </label>{" "}
  
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>


      {message && (
        <p
          style={{
            color: message.type === "success" ? "green" : "red",
            textAlign: "center",
            margin: "0",
          }}
        >
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={registerMutation.isPending}
        style={{
          padding: "10px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {registerMutation.isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;
