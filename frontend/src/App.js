import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import VoterDashboard from './pages/VoterDashboard';
import ElectionsPage from './pages/ElectionsPage';
import VotingPage from './pages/VotingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vdashboard" element={<VoterDashboard />} />
        <Route path="/elections" element={<ElectionsPage />} />
        <Route path="/elections/:id/vote" element={<VotingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;