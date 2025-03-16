import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AuthContextProvider from "./utils/AuthContext";

// Layout Components
import VerticalNavBar from "./Components/CommonComponents/VerticalNavBar";

// Voter Pages
import Home from "./Pages/Voters/Home";
import Election from "./Pages/Voters/Election";
import ElectionDetails from "./Pages/Voters/ElectionDetails";
import VotingProcess from "./Pages/Voters/VotingProcess";
import ViewPost from "./Pages/Voters/ViewPost";

// Candidate Pages
import Candidates from "./Pages/Candidate/Candidates";
import CandidateProfilePage from "./Pages/Candidate/CandidateProfilePage";

// Admin Pages
import AdminElection from "./Pages/Admin/AdminElection";
import ViewAllElections from "./Pages/Admin/ViewAllElections";
import CreateElections from "./Pages/Admin/CreateElections";
import ElectionsReport from "./Pages/Admin/ElectionResults";
import CandidateManagement from "./Pages/Admin/CandidateManagement";
import StudentManagement from "./Pages/Admin/StudentManagement";
// Authentication Pages
import Login from "./Pages/Login";
import Verify_OTP from "./Pages/Verify-OTP";

const AppContent = () => {
  const user = undefined;
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <AuthContextProvider>
      <div className="flex">
        {!isLoginPage && <VerticalNavBar user={user} />}
        <main className={`${isLoginPage ? "w-full p-0" : "flex-grow p-8"}`}>
          <Routes>
            {/* Voter Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/election" element={<Election />} />
            <Route path="/election/:id" element={<ElectionDetails />} />
            <Route path="/election/:id/vote" element={<VotingProcess />} />
            <Route path="/view-post" element={<ViewPost />} />
            
            {/* Candidate Routes */}
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidate-profile" element={<CandidateProfilePage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify_OTP />} />

            {/* Admin Routes */}
            <Route path="/admin/elections" element={<AdminElection />} />
            <Route path="/admin/elections/view" element={<ViewAllElections />} />
            <Route path="/admin/elections/create" element={<CreateElections />} />
            <Route path="/admin/elections/results" element={<ElectionsReport />} />
            <Route path="/admin/candidates" element={<CandidateManagement />} />
            <Route path="/admin/students" element={<StudentManagement />} />
          </Routes>
        </main>
      </div>
    </AuthContextProvider>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
