import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import VerticalNavBar from "./Components/VerticalNavBar";
import Home from "./Pages/Home";
import Candidates from "./Pages/Candidates";
import Election from "./Pages/Election";
import Login from "./Pages/Login";
import Verify_OTP from "./Pages/Verify-OTP";
import DocumentPage from "./pages/DocumentPage";
import AuthContextProvider from "./utils/AuthContext";

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
            <Route path="/" element={<Home />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/election" element={<Election />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify_OTP />} />
            <Route path="/document" element={<DocumentPage />} />
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
