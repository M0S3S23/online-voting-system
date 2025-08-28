// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage"; // ← This is the Login Page
import RegisterPage from "./pages/RegisterPage"; // ← This is the Sign Up Page
import ResetPasswordPage from "./pages/ResetPasswordPage"; // ← Your new page
import VoterDashboard from "./pages/VoterDashboard";
import ElectionsPage from "./pages/ElectionsPage";
import ElectionDetailsPage from "./pages/ElectionDetailsPage";
import PositionBallotPage from "./pages/PositionBallotPage";
import VotingPage from "./pages/VotingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {/* Authentication Routes (Marion - Assignment #1) */}
        <Route path="/signin" element={<SignInPage />} /> {/* Login */}
        <Route path="/register" element={<RegisterPage />} /> {/* Sign Up */}
        <Route path="/forgot-password" element={<ResetPasswordPage />} />
        {/* Voter Routes */}
        <Route path="/vdashboard" element={<VoterDashboard />} />
        <Route path="/elections" element={<ElectionsPage />} />
        <Route path="/elections/:id" element={<ElectionDetailsPage />} />
        <Route
          path="/elections/:id/positions/:positionId"
          element={<PositionBallotPage />}
        />
        <Route path="/elections/:id/vote" element={<VotingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
