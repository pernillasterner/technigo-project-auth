import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const registerUser = async (userData) => {
    console.log(userData); // I get correct data
    try {
      // Send data to backend /users
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      console.log("Registration success", data);
    } catch (err) {
      console.error("Error registering new user:", err);
    }
  };

  // //Create user with username and password
  // app.post("/users", async (req, res) => {
  //   try {
  //     const { username, firstName, lastName, age, email, password } = req.body;
  //     const salt = bcrypt.genSaltSync(10);
  //     const user = new User({
  //       username,
  //       firstName,
  //       lastName,
  //       age,
  //       email,
  //       password: bcrypt.hashSync(password, salt),
  //     });
  //     await user.save();
  //     res.status(201).json(user);
  //     //res.status(201).json({ id: user._id, accessToken: user.accessToken });
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     res
  //       .status(400)
  //       .json({ response: error, message: "Could not create user." });
  //   }
  // });

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        setUser,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useLogin = () => useContext(UserContext);
