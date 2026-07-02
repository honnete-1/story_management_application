import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import StoryList from "./pages/StoryList.jsx";
import AddStory from "./pages/AddStory.jsx";
import StoryDetails from "./pages/StoryDetails.jsx";
import EditStory from "./pages/EditStory.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<StoryList />} />
          <Route path="/add" element={<AddStory />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
          <Route path="/stories/:id/edit" element={<EditStory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
