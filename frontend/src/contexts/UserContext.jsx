import { createContext, useContext, useState } from "react";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Uses the username to set the user and set isLoggedIn-state to true
  const login = (username) => {
    setUser({ username });
    setIsLoggedIn(true);
  };

  //Sends userData to backend to create a new user
  const registerUser = async (userData) => {
    console.log(userData); // I get correct data
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(
        process.env.API_URL || "http://localhost:8000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      console.log(response);
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
        login,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useLogin = () => useContext(UserContext);
