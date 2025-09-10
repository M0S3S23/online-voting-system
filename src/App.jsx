// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import VoterDashboard from './pages/VoterDashboard';
import ElectionsPage from './pages/ElectionsPage';
import VotingPage from './pages/VotingPage';
import AdminDashboard from './pages/admin/dashboard';
import AdminUsersPage from './pages/admin/users';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import { UserProvider } from './contexts/UserContext';
import CreateElectionPage from './pages/admin/CreateElectionPage';
import ManageElectionPage from './pages/admin/ManageElectionPage';
import { ElectionProvider } from './contexts/ElectionContext.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import ElectionDetailsPage from './pages/ElectionDetailsPage';
import PositionBallotPage from './pages/PositionBallotPage';
import ElectionResults from './pages/ElectionResults';
import Profile from './pages/Profile';
import ApplicationStatus from './pages/candidate/ApplicationStatus.jsx';
import ViewElectionPage from './pages/admin/ViewElectionPage';

import NotificationsPage from './pages/NotificationsPage';

// ✅ Import your new error pages
import ErrorPage from './pages/ErrorPage';
import ServerError from './pages/ServerError';
import CandidateDashboard from './pages/candidate/CandidateDashboard.jsx';
import CandidateApplicationStatus from './pages/candidate/CandidateApplicationStatus.jsx';
import ElectionDetails from './pages/candidate/ElectionDetails.jsx';
import ProfileManifesto from './pages/candidate/ProfileManifesto.jsx';
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import NotificationsPage from './pages/NotificationsPage';
import { ThemeProvider } from "./contexts/ThemeContext";



function App() {
  return (
    <ThemeProvider>
    <UserProvider>
      <ElectionProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ResetPasswordPage />} />

            {/* Voter Routes */}
            <Route path="/vdashboard" element={<VoterDashboard />} />
            <Route path="/elections" element={<ElectionsPage />} />
            <Route path="/elections/:id" element={<ElectionDetailsPage />} />
            <Route path="/elections/:id/positions/:positionId" element={<PositionBallotPage />} />
            <Route path="/elections/:id/vote" element={<VotingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/candidate/application-status" element={<ApplicationStatus />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/candidate/application-status" element={<CandidateApplicationStatus />} />
            <Route path="/application-status/:electionId" element={<ApplicationStatusPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/elections" element={<CreateElectionPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/elections/:electionId/manage" element={<ManageElectionPage />} />
            <Route path="/admin/elections/:id/view" element={<ViewElectionPage />} />

            {/* Candidate Routes */}
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/application-status1" element={<CandidateApplicationStatus />} />
            <Route path="/candidate/elections/:id/details" element={<ElectionDetails />} />
            <Route path="/candidate/profile/manifesto" element={<ProfileManifesto />} />

            <Route path="/admin/results" element={<ElectionResults />} />

            {/* Error Routes */}
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ElectionProvider>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
