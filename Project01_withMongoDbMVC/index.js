const express = require("express");

const { connectMongoDB } = require("./connection");

const User = require("./models/user");

const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const port = 8005;

connectMongoDB("mongodb://127.0.0.1:27017/project-test-1").then(() => {
  console.log("MongoDB connected")
});

// ** middleware / plugins to help our post req call
app.use(express.urlencoded({ extended: false })); //built-in middleware

//custom middleware or basic middleware
app.use((req, res, next) => {
  console.log("hello from Middleware");
  next();
});

//Routes
app.get("/", (req, res) => res.send(`Welcome to LocalHost: ${port}`));

//server side rendering : only works on browsers as it's always return HTML
app.get("/users", async (req, res) => {
  const allDbUSers = await User.find({});

  const html = `
    ${allDbUSers
      .map(
        user => `
        
            <ul>
                <li>${user.first_name}</li>
                <li>${user.email}</li>
                <li>${user.job_title}</li>
            </ul>
        
        `
      )
      .join("")}`;
  res.send(html);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) res.send(`user not found`);

  const html = `
        <ul>
        <li>${user.first_name}</li>
        <li>${user.email}</li>
        <li>${user.job_title}</li>
        </ul>
        
      `;
  res.send(html); //ssr => server-side rendering
});

app.use("/api/users", userRouter);

app.use(logReqRes("log.txt"));

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}/`)
);
