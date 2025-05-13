import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./auth/passportConfig.js";

import { handleLogin, handleRegister } from "./controllers/user.js";

const app = express();

//connect mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`
    API is runing...
  `);
});

app
  .route("/api/login")
  .get((req, res) => {
    return res.status(200).send({ success: true, msg: "login page" });
  })
  .post(handleLogin);

app
  .route("/api/register")
  .get((req, res) => {
    return res.status(200).send({ success: true, msg: "register page" });
  })
  .post(handleRegister);

// app.get("/api/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
// app.get("/api/auth/google/callback", passport.authenticate("google", {successFlash: "User Authenticated.", failureFlash:"User not found"}))

app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
