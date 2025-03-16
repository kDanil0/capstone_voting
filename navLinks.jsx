import { Home, Users, UserRound, Vote, LogOut, UserCircle, LayoutDashboard } from "lucide-react";

export const navLinks = [
  { path: "/", name: "Home", icon: Home },
  { path: "/candidates", name: "Candidates", icon: Users },
  { path: "/election", name: "Election", icon: Vote },
];

export const candidateLinks = [
  {
    path: "/candidate-profile",
    name: "Profile",
    icon: UserCircle,
  },
];

export const bottomNavLink = {
  path: "/signout",
  name: "Sign Out",
  icon: LogOut,
};

export const adminNavLinks = [
  { path: "/admin/dashboard", name: "Dashboard", icon: Home },
  { path: "/admin/elections", name: "Elections", icon: Vote },
  { path: "/admin/candidates", name: "Candidates", icon: Users },
  { path: "/admin/students", name: "Students", icon: UserRound },
];


