const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { validateToken } = require("./services/auth");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const e = require("express");
const { checkForAuthCookie } = require("./middleware/auth");

const app = express();
const PORT = 8001;
let loggedUser = null;

mongoose.connect("mongodb://localhost:27017/Blogger").then(() => {
  console.log("connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//   console.log("req from middleware -- ", req.cookies?.token);
//   if (req.cookies?.token) {
//     const token = req.cookies.token;
//     const payload = validateToken(token);
//     if (payload) {
//       req.user = payload;
//     }
//   }
//   console.log(req.user);
//   loggedUser = req.user;
//   next();
// });
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});

app.use("/", userRoute);
app.use("/user", checkForAuthCookie("token"), blogRoute);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`);
});
