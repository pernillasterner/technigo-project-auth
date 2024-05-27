import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";

// Load environment variables from .env file
// dotenv.config();

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState({
    accessToken: localStorage.getItem("accessToken"),
    auth: false,
  });
  const navigate = useNavigate();

  //Uses password and username or email to do a login-request
  const login = async (loginData, accessToken) => {
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(
        //"http://localhost:8000/sessions",
        "https://technigo-project-auth.onrender.com/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      //Not successful
      if (!response.ok) {
        console.log("Login failed");
        throw new Error("Failed to get user");
      }
      //Successful
      const data = await response.json();
      console.log("Login success", data);

      // Save accesstoken in local storage
      localStorage.setItem("accessToken", data.accessToken);
      setAuthenticated({
        accessToken,
        auth: true,
      });
    } catch (err) {
      console.error("No user was found:", err);
    }
  };


  const signout = () => {
    localStorage.removeItem("accessToken")
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
        //"http://localhost:8000/users",
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

      // Save accesstoken in local storage
      localStorage.setItem("accessToken", data.accessToken);
      setAuthenticated({
        //accessToken: data.accessToken,
        auth: true,
      });
    } catch (err) {
      console.error("Error registering new user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
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
