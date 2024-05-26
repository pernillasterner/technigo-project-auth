import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";

// Load environment variables from .env file
// dotenv.config();

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState({
    accessToken: localStorage.getItem("accessToken"),
    auth: false,
  });
  const navigate = useNavigate();

  const login = async (loginData, accessToken) => {
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(
        "https://technigo-project-auth.onrender.com/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      if (!response.ok) {
        console.log("Login failed")
        throw new Error("Failed to get user");
      }

      const data = await response.json();
      console.log("Login success", data);

      // Save accesstoken in local storage
      localStorage.setItem("accessToken", data.accessToken);
      setAuthenticated({
        accessToken,
        auth: true,
      });

      setIsLoggedIn(true);
    } catch (err) {
      console.error("No user was found:", err);
    }
  };


  const signout = () => {
    localStorage.removeItem("accessToken")
    setIsLoggedIn(false);
    setAuthenticated({
      auth: false,
    })
    navigate("/login");
  }

  // Function that sends userData to MongoDB to create a new user
  const registerUser = async (userData) => {
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(
        "https://technigo-project-auth.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      console.log("Registration success", data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error registering new user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        authenticated,
        login,
        signout,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useLogin = () => useContext(UserContext);
