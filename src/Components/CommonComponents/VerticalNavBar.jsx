import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { User, LogIn } from "lucide-react";
import { navLinks, bottomNavLink, candidateLinks, adminNavLinks } from "../../../navLinks";
import { useAuthContext } from "../../utils/AuthContext";
import { logoutUser } from "../../utils/api";

function VerticalNavBar() {
  const { user, setToken } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add this for testing different roles
  const [testRole, setTestRole] = useState(null);
  
  if (location.pathname === "/verify") {
    return null;
  }

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("token");
      await logoutUser(token);
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Modified to use testRole when available
  const getNavigationLinks = () => {
    // If in test mode, use the test role
    const roleId = testRole !== null ? testRole : user?.role_id;
    
    if (!user?.name && !testRole) {
      return navLinks.filter((link) => link.name !== "Sign Out");
    }

    if (roleId === 1) { // Admin role
      return adminNavLinks;
    }
    
    if (roleId === 2) {
      return [...navLinks, ...candidateLinks];
    }

    return navLinks;
  };

  const filteredNavLinks = getNavigationLinks();

  // Test UI controls - only show in development
  const isDevEnvironment = process.env.NODE_ENV === 'development';

  return (
    <>
      {isDevEnvironment && (
        <div className="fixed top-0 right-0 bg-yellow-100 p-2 z-50 border border-yellow-400 rounded m-2">
          <h3 className="font-bold text-sm">Navbar Role Tester</h3>
          <div className="flex gap-2 mt-1">
            <button 
              onClick={() => setTestRole(null)} 
              className={`px-2 py-1 text-xs rounded ${testRole === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Normal
            </button>
            <button 
              onClick={() => setTestRole(1)} 
              className={`px-2 py-1 text-xs rounded ${testRole === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Admin
            </button>
            <button 
              onClick={() => setTestRole(2)} 
              className={`px-2 py-1 text-xs rounded ${testRole === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Candidate
            </button>
          </div>
          <div className="text-xs mt-1">
            Current: {testRole !== null ? `Test (${testRole})` : `Actual (${user?.role_id || 'guest'})`}
          </div>
        </div>
      )}
      
      <nav className="text-xl w-64 bg-[#38438c] text-[#e3e3e8] shrink-0">
        <div className="flex flex-col h-screen sticky top-0">
          <div className="flex flex-col items-center p-4 border-b border-[#e3e3e8]">
            <div className="w-20 h-20 rounded-full bg-[#e3e3e8] flex items-center justify-center mb-2">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <User size={40} className="text-[#38438c]" />
              )}
            </div>
            <span className="text-lg font-climate tracking-widest text-center">
              {user?.name || "Guest"}
            </span>
          </div>

          <div className="flex-grow font-bebas tracking-widest overflow-y-auto">
            {filteredNavLinks.map((link) => (
              <NavItem key={link.path} {...link} />
            ))}

            {!user?.name && !testRole && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 transition-colors mb-3 ${
                    isActive
                      ? "bg-[#e3e3e8] text-[#38438c]"
                      : "hover:bg-[#e3e3e8] hover:text-[#38438c]"
                  }`
                }
              >
                <LogIn size={25} />
                <span className="ml-5">Login</span>
              </NavLink>
            )}
          </div>

          {(user?.name || testRole) && (
            <div onClick={handleSignOut} className="mt-auto">
              <NavItem {...bottomNavLink} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

const NavItem = ({ path, name, icon: Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 transition-colors mb-3 ${
          isActive
            ? "bg-[#e3e3e8] text-[#38438c]"
            : "hover:bg-[#e3e3e8] hover:text-[#38438c]"
        }`
      }
    >
      <Icon size={25} />
      <span className="ml-5">{name}</span>
    </NavLink>
  );
};

export default VerticalNavBar;
