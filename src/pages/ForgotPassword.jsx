import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      // The API intentionally returns the same message whether or not the
      // email exists (prevents attackers from discovering which emails are
      // registered). So we always move forward to the reset page.
      navigate("/reset-password", { state: { email } });
    },
    onError: (err) => {
      const message = err.response?.data?.error || "Something went wrong.";
      alert(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotMutation.mutate({ email });
  };

  return (
    <div className="detail-page">
      <h2>Forgot Password</h2>
      <p>Enter your email and we'll send you a reset code, if an account exists.</p>

      <form onSubmit={handleSubmit} className="story-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={forgotMutation.isPending}
        >
          {forgotMutation.isPending ? "Sending..." : "Send Reset Code"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
