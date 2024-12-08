import { Home, Users, Vote, LogOut } from "lucide-react";

export const navLinks = [
  { path: "/", name: "Home", icon: Home },
  { path: "/candidates", name: "Candidates", icon: Users },
  { path: "/election", name: "Election", icon: Vote },
];

export const bottomNavLink = {
  path: "/signout",
  name: "Sign Out",
  icon: LogOut,
};
