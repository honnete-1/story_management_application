import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        📖 Story Manager
      </Link>

      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Stories
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
          Add Story
        </NavLink>

        {!isAuthenticated && (
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
        )}

        {isAuthenticated ? (
          <>
            <span className="navbar-user">Welcome back, {user?.email}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <span className="navbar-user">Guest User</span>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
