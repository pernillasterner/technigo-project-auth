import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";

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
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: Missing access token" });
  }

  const user = await User.findone({ accessToken })
  if (user) {
    console.log("User is found", user);
    req.user = user;
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Invalid access token" });
  }
};

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable." });
  }
});

// Defining routes
app.get("/", (req, res) => {
  res.send("Hello friend!");
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find().exec();
  if (allUsers.length > 0) {
    res.status(200).json(allUsers);
  } else {
    res.status(404).send("No users found");
  }
});

//Create user with username, password etc.
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
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    res
      .status(400)
      .json({ response: error, message: "Could not create user." });
  }
});

//Endpoint for login
app.post("/sessions", async (req, res) => {
  const userByUsername = await User.findOne({ username: req.body.username });
  const userByEmail = await User.findOne({ email: req.body.email });
  if (
    userByUsername &&
    bcrypt.compareSync(req.body.password, userByUsername.password)
  ) {
    res.status(200).json({
      userId: userByUsername._id,
      accessToken: userByUsername.accessToken,
    });
  } else if (
    userByEmail &&
    bcrypt.compareSync(req.body.password, userByEmail.password)
  ) {
    res.status(200).json({ userId: userByEmail._id, accessToken: userByEmail.accessToken });
  } else {
    res.status(404).json({ notFound: true });
  }
});

app.get("/games", authenticateUser);
app.get("/games", async (req, res) => {
  res
    .status(200)
    .json({ message: "Secret message only for logged in users to see!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
