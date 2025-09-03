// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";           // ← This is the Login Page
import RegisterPage from "./pages/RegisterPage";       // ← This is the Sign Up Page
import ResetPasswordPage from "./pages/ResetPasswordPage"; // ← Password Reset Page
import VoterDashboard from "./pages/VoterDashboard";
import ElectionsPage from "./pages/ElectionsPage";
import ElectionDetailsPage from "./pages/ElectionDetailsPage";
import PositionBallotPage from "./pages/PositionBallotPage";
import VotingPage from "./pages/VotingPage";
import Profile from "./pages/Profile";
import ElectionResults from "./pages/ElectionResults";
import NotificationsPage from './pages/NotificationsPage'; //  Notifications Page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Routes (Marion - Assignment #1) */}
        <Route path="/signin" element={<SignInPage />} />           {/* Login */}
        <Route path="/register" element={<RegisterPage />} />       {/* Sign Up */}
        <Route path="/forgot-password" element={<ResetPasswordPage />} />

        {/* Voter Routes */}
        <Route path="/vdashboard" element={<VoterDashboard />} />
        <Route path="/elections" element={<ElectionsPage />} />
        <Route path="/elections/:id" element={<ElectionDetailsPage />} />
        <Route path="/elections/:id/positions/:positionId" element={<PositionBallotPage />} />
        <Route path="/elections/:id/vote" element={<VotingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<NotificationsPage />} /> {/* ✅ Added Route */}

        {/* Admin Routes */}
        <Route path="/admin/results" element={<ElectionResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;