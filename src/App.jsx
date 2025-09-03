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
import { ElectionProvider } from "./contexts/ElectionContext.jsx";

function App() {
  return (
    <UserProvider>
      <ElectionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vdashboard" element={<VoterDashboard />} />
            <Route path="/elections" element={<ElectionsPage />} />
            <Route path="/elections/:id/vote" element={<VotingPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/elections" element={<CreateElectionPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/elections/:electionId/manage" element={<ManageElectionPage />} />
          </Routes>
        </BrowserRouter>
      </ElectionProvider>
    </UserProvider>
  );
}

export default App;
