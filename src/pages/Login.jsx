import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // data: { message, accessToken, refreshToken, role }
      login(data.accessToken, data.refreshToken, data.role, { email });
      navigate("/");
    },
    onError: (err) => {
      console.error(err);

      if (err.response?.status === 403) {
        // Email not verified yet — send them to verify instead of just alerting
        const goVerify = window.confirm(
          "Your email isn't verified yet. Go verify it now?"
        );
        if (goVerify) navigate("/verify-email", { state: { email } });
        return;
      }

      if (err.response) {
        alert(
          `Login failed (${err.response.status}): ${
            err.response.data?.error || "Invalid email or password."
          }`
        );
      } else if (err.request) {
        alert("Could not reach the server. Check your connection and try again.");
      } else {
        alert(`Login error: ${err.message}`);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="detail-page">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="story-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging In..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot password?</Link>
      </p>
    </div>
  );
}

export default Login;
