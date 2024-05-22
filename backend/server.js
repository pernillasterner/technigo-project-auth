import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defining schema for a User
const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    // Random string of bytes
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

/* Example
// POST request
const request = { name: "Bob", password: "foobar" };
// DB Entry
const dbEntry = { name: "Bob", password: "45lkjt5elk52" };
bcrypt.compareSync(request.password, dbEntry.password);
*/

const user = new User({ username: "Bob", password: bcrypt.hashSync("foobar") });
user.save();

// Defining port
const port = process.env.PORT || 8000;
const app = express();

const authenticateUser = async (req, res, next) => {
  // Using authorization from header to find user
  const user = await User.findOne({ accessToken: req.header("Authorization") });

  // Checking if user is found
  if (user) {
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

app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // Success
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
