const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  restrictedToLoggedInUserOnly,
  checkAuth,
} = require("./middlewares/auth");

const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { connectToDB } = require("./connection/connectDB");

const app = express();
const port = 8001;

connectToDB("mongodb://127.0.0.1:27017/user").then(() => {
  console.log("Mongodb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/home", restrictedToLoggedInUserOnly, homeRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
