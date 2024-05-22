import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth-users";
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
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

// Defining port
const port = process.env.PORT || 8000;
const app = express();

const authenticateUser = async (req, res, next) => {
  // Using authorization from header to find user
  const user = await User.findOne({ accessToken: req.header("Authorization") });

  // Checking if user is found
  if (user) {
    console.log("User is found", user);
    // Modifing request to add the user to the request
    req.user = user;
    // Allowing express to continue with the api request
    next();
  } else {
    // User is not authorized to continue with the request
    req.status(401).json({ loggedOut: true });
  }
};

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Defining routes
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.post("/tweets", authenticateUser);
// app.post("/tweets", async (req, res) => {
//   // This will only happen if the next() function is called from the middleware
//   // now we can access the req.user object from the middleware
// });

//Create user with username and password
app.post("/users", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
    });

    console.log("Trying to create new user" + user);
    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(400)
      .json({ message: "Could not create user.", errors: err.errors });
  }
});

//Endpoint for login
app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    // Failure
    // a. User doesn't exist
    // b. Encrypted password doesn't match
    res.json({ notFound: true });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
