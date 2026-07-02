import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail, resendVerification } from "../services/authService";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      alert("Email verified! You can now log in.");
      navigate("/login");
    },
    onError: (err) => {
      const message = err.response?.data?.error || "Invalid or expired code.";
      alert(message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendVerification,
    onSuccess: () => {
      alert("A new code has been sent to your email.");
    },
    onError: (err) => {
      const message = err.response?.data?.error || "Could not resend the code.";
      alert(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyMutation.mutate({ email, otp });
  };

  return (
    <div className="detail-page">
      <h2>Verify Your Email</h2>
      <p>We sent a 6-digit code to your email. It expires in 5 minutes.</p>

      <form onSubmit={handleSubmit} className="story-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Verification Code</label>
        <input
          type="text"
          placeholder="6-digit code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Didn't get a code?{" "}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => resendMutation.mutate({ email })}
          disabled={!email || resendMutation.isPending}
        >
          {resendMutation.isPending ? "Sending..." : "Resend Code"}
        </button>
      </p>

      <p>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default VerifyEmail;
