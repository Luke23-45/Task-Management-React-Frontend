import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { type AuthTokens } from "./types/auth";
import { setTokens } from "./store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TasksPage from "./pages/TasksPage/TasksPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App initialized. Checking local storage for auth tokens...");
    try {
      const tokensString = localStorage.getItem("authTokens");
      if (tokensString) {
        const authTokens: AuthTokens = JSON.parse(tokensString);

        if (authTokens && authTokens.access) {
          console.log(
            "Found tokens in local storage. Setting authentication state."
          );

          dispatch(setTokens(authTokens));
        } else {
          console.log(
            "Tokens found in local storage were invalid. Clearing..."
          );
          localStorage.removeItem("authTokens");
        }
      } else {
        console.log("No auth tokens found in local storage.");
      }
    } catch (error) {
      console.error("Failed to load auth tokens from local storage:", error);

      localStorage.removeItem("authTokens");
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthPage />} />

              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/:id"
                element={
                  <ProtectedRoute>
                    <TaskDetailPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
