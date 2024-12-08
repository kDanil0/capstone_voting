import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { User, LogIn } from "lucide-react";
import { navLinks, bottomNavLink } from "../../navLinks";
import { useAuthContext } from "../utils/AuthContext";
import { logoutUser } from "../utils/api";

function VerticalNavBar() {
  const { user, setToken } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

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

  const filteredNavLinks = user?.name
    ? navLinks
    : navLinks.filter((link) => link.name !== "Sign Out");

  return (
    <nav className="font-bebas text-xl flex flex-col h-screen w-64 bg-[#38438c] text-[#e3e3e8]">
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

      <div className="flex-grow">
        {filteredNavLinks.map((link) => (
          <NavItem key={link.path} {...link} />
        ))}

        {!user?.name && (
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
            <span className="ml-2">Login</span>
          </NavLink>
        )}
      </div>

      {user?.name && (
        <div onClick={handleSignOut} className="mt-auto">
          <NavItem {...bottomNavLink} />
        </div>
      )}
    </nav>
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
      <span className="ml-2">{name}</span>
    </NavLink>
  );
};

export default VerticalNavBar;
