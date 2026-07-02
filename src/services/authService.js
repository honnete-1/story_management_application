import axios from "axios";

const API_URL = "https://sms-express-app-1-production-a843.up.railway.app";

// POST /api/auth/register -> { message, userId }  (no token yet — must verify email next)
export const registerUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, credentials);
  return response.data;
};

// POST /api/auth/verify-email -> { message }
export const verifyEmail = async ({ email, otp }) => {
  const response = await axios.post(`${API_URL}/api/auth/verify-email`, { email, otp });
  return response.data;
};

// POST /api/auth/resend-verification -> { message }
export const resendVerification = async ({ email }) => {
  const response = await axios.post(`${API_URL}/api/auth/resend-verification`, { email });
  return response.data;
};

// POST /api/auth/login -> { message, accessToken, refreshToken, role }
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};

// POST /api/auth/refresh-token -> { accessToken, refreshToken }
export const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/api/auth/refresh-token`, { refreshToken });
  return response.data;
};

// POST /api/auth/logout -> { message } (revokes the refresh token server-side)
export const logoutUser = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/api/auth/logout`, { refreshToken });
  return response.data;
};

// POST /api/auth/forgot-password -> { message }
export const forgotPassword = async ({ email }) => {
  const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
  return response.data;
};

// POST /api/auth/reset-password -> { message }
export const resetPassword = async ({ email, otp, newPassword }) => {
  const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
    email,
    otp,
    newPassword,
  });
  return response.data;
};
