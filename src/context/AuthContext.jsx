import { createContext, useContext, useState } from "react";
import { logoutUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Called after a successful login. The backend returns an access token
  // (short-lived, 15 min) and a refresh token (long-lived, 7 days). Both
  // get persisted so a page refresh doesn't lose the session.
  const login = (newToken, newRefreshToken, newRole, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("role", newRole || "");
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setRole(newRole || "");

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  // Tells the backend to revoke the refresh token, then clears local state
  // regardless of whether that call succeeds (so the user is never stuck
  // "logged in" on the frontend just because the network request failed).
  const logout = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedRefreshToken) {
      try {
        await logoutUser(storedRefreshToken);
      } catch (err) {
        console.error("Failed to revoke refresh token on the server:", err);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken("");
    setRefreshToken("");
    setRole("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        role,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
