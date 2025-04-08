const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./dbConnection");
const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const URL = require("./models/url");

const app = express();
const PORT = 4007;

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongoDb connected")
);

//setting view engine for ssr
app.set("view engine", "ejs");

//fetching ejs folver from ./views path using path module
app.set("views", path.resolve("./views"));

app.use(express.json()); //to parse json 
app.use(express.urlencoded({ extended: false })); //to handle form input

app.use("/url", urlRoutes);
app.use("/", staticRoute);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
