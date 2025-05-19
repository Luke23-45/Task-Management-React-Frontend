import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "@/api/mutations/authMutaton";
import { fetchUserProfile } from "@/api/queries/authQueries";
import { setTokens, setUser } from "@/store/slices/authSlice";
import {
  type LoginCredentials,
  type AuthTokens,
  type User,
} from "@/types/auth";

import {
  StyledForm,
  FormField,
  StyledLabel,
  StyledInput,
  ErrorMessage,
  SubmitButton,
} from "./LoginForm.styled";
import { logout } from "@/store/slices/authSlice";
function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: async (data: AuthTokens) => {
      console.log("Login successful:", data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      dispatch(setTokens(data));

      try {
        const user: User = await queryClient.fetchQuery({
          queryKey: ["user", "me"],
          queryFn: fetchUserProfile,
        });
        console.log("User profile fetched:", user);
        dispatch(setUser(user));
        navigate("/tasks", { replace: true });
      } catch (profileError: any) {
        console.error(
          "Failed to fetch user profile after login:",
          profileError
        );

        dispatch(logout());
        localStorage.removeItem("authTokens");
        setError(
          "Login successful, but failed to fetch user profile. Please try logging in again."
        );
      }
    },
    onError: (err: any) => {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "An unexpected error occurred during login.";
      setError(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate({ username: email, password });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormField>
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loginMutation.isPending}
        />
      </FormField>

      <FormField>
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loginMutation.isPending}
        />
      </FormField>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging In..." : "Login"}
      </SubmitButton>
    </StyledForm>
  );
}

export default LoginForm;
