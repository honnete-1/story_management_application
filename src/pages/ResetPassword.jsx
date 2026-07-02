import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/authService";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert("Password reset successfully. Please log in.");
      navigate("/login");
    },
    onError: (err) => {
      const message = err.response?.data?.error || "Could not reset password.";
      alert(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetMutation.mutate({ email, otp, newPassword });
  };

  return (
    <div className="detail-page">
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit} className="story-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Reset Code</label>
        <input
          type="text"
          placeholder="6-digit code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={resetMutation.isPending}
        >
          {resetMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
