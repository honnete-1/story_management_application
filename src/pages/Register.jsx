import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Registering does NOT log the user in — the account is unverified
      // until they enter the OTP sent to their email. Send them there,
      // passing the email along so they don't have to retype it.
      navigate("/verify-email", { state: { email } });
    },
    onError: (err) => {
      console.error(err);
      if (err.response) {
        const detail = err.response.data?.details?.[0]?.message;
        alert(
          `Registration failed (${err.response.status}): ${
            detail || err.response.data?.error || "Please try again."
          }`
        );
      } else if (err.request) {
        alert("Could not reach the server. Check your connection and try again.");
      } else {
        alert(`Registration error: ${err.message}`);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate({ email, password });
  };

  return (
    <div className="detail-page">
      <h2>Create an Account</h2>

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
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Register;
