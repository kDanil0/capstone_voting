import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "./api";

export const AuthContext = createContext({
  user: {},
  token: "",
  setUser: () => {},
  setToken: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(token);
          console.log("Setting user data:", userData); // Debug log
          setUser(userData); // The API response already contains the user object
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };

      fetchUser();
    } else {
      setUser({});
    }
  }, [token]);

  console.log("Current user in context:", user); // Debug log

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
