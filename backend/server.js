import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import { log } from "console";

// Defining port and connecting to mongoose
const port = process.env.PORT || 8000;
const app = express();
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";

console.log("Connecting to MongoDB at:", mongoUrl);
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defining schema for a User
const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

//Authenticate user as middleware
/*const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    console.log("User is found", user);
    req.user = user;
    next();
  } else {
    req.status(401).json({ loggedOut: true });
  }
};*/

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: Missing access token" });
  }

  const user = await User.findone({ accessToken })
  if (!user) {
    return res.status(403).json({ error: "Forbidden: Invalid access token" });
  }

  console.log("User is found", user);
  req.user = user;
  next();
};

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Defining routes
app.get("/", (req, res) => {
  res.send("Hello friend!");
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find().exec();
  if (allUsers.length > 0) {
    res.json(allUsers);
  } else {
    res.status(404).send("No users found");
  }
});

//Create user with username and password
app.post("/users", async (req, res) => {
  try {
    const { username, firstName, lastName, age, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      username,
      firstName,
      lastName,
      age,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    await user.save();
    res.status(201).json(user);
    //res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(400)
      .json({ response: error, message: "Could not create user." });
  }
});

//Endpoint for login
app.post("/sessions", async (req, res) => {
  const userByUsername = await User.findOne({ username: req.body.username });
  const userByEmail = await User.findOne({ email: req.body.email });
  console.log(userByUsername);
  console.log(userByEmail);
  if (
    userByUsername &&
    bcrypt.compareSync(req.body.password, userByUsername.password)
  ) {
    res.json({
      userId: userByUsername._id,
      accessToken: userByUsername.accessToken,
    });
    console.error("Success - userByUsername");
  } else if (
    userByEmail &&
    bcrypt.compareSync(req.body.password, userByEmail.password)
  ) {
    console.error("Success - userByEmail");
    res.json({ userId: userByEmail._id, accessToken: userByEmail.accessToken });
  } else {
    console.error("User not found:", error);
    res.json({ notFound: true });
  }
});

app.get("/games", authenticateUser);
app.get("/games", async (req, res) => {
  res.json({ message: "You are logged in"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
