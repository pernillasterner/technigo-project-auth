import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: {
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

const user = new User({ name: "Bob", password: bcrypt.hashSync("foobar") });
user.save();

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });

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
