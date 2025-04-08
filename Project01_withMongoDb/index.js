const express = require("express");
let users = require("./assets/MOCK_DATA.json");
const fs = require("fs");
/*
Process to connect with MongoDB
run locally mongo-shell(mongosh)
install dependency mongoose
*/
const mongoose = require("mongoose");
const { type } = require("os");
const { timeStamp } = require("console");

const app = express();
const port = 8003;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/project-test-1")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String
    },
    ip_address: {
      type: String
    },
    job_title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// ** middleware / plugins to help our post req call
app.use(express.urlencoded({ extended: false })); //built-in middleware

//custom middleware or basic middleware
app.use((req, res, next) => {
  console.log("hello from Middleware");
  next();
});

/*

what is middleaware?? 

** Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

** Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

** Middleware functions can perform the following tasks:

    -> Execute any code.
    -> Make changes to the request and the response objects.
    -> End the request-response cycle.
    -> Call the next middleware function in the stack.


** If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

visit : https://expressjs.com/en/guide/using-middleware.html

*/

app.use((req, res, next) => {
  console.log("hello from Middleware");
  fs.appendFile(
    "./log.txt",
    `${Date.now()} : ${req.ip} - ${req.method} - ${req.path}\n`,
    err => next()
  );
});

//Routes
app.get("/", (req, res) => res.send(`Welcome to LocalHost: ${port}`));

//hybrid request can use in various platforms like iot, browsers, mobiles etc
app.get("/api/users", async (req, res) => {
  const allDbUSers = await User.find({});
  res.json(allDbUSers)
});

//server side rendering : only works on browsers as it's always return HTML
app.get("/users", async (req, res) => {
  const allDbUSers = await User.find({});

  const html = `
    ${allDbUSers
      .map(
        user => `
        
            <ul>
                <li>${user.first_name}</li>
                <li>${user.ip_address}</li>
                <li>${user.job_title}</li>
            </ul>
        
        `
      )
      .join("")}`;
  res.send(html);
});

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id)
//     return res.json(users.filter((user) => id === user.id))
// })

// app.patch('/api/users/:id', (req,res) => {
//     const id = Number(req.params.id)
//     return res.json({patched :id})
// })

// app.delete('/api/users/:id', (req,res) => {
//     const id = Number(req.params.id)
//     return res.json({patched :id})
// })

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || null)
        res.status(404).json({ message: "user not found error" });

      return res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  })
  .patch(async (req, res) => {
    try {
      //users can only change first_name, email, job_title and restricted to change other fields
      const user = await User.findById(req.params.id);
      const body = req.body;
      let changed = {};

      if (!user || null)
        return res
          .status(404)
          .json({ status: error, message: "user not found" });

      if (body.first_name && body.first_name.length > 1) {
        user.first_name = body.first_name;
        changed = { ...changed, first_name: true };
      }

      if (body.job_title && body.job_title.length > 1) {
        user.job_title = body.job_title;
        changed = { ...changed, job_title: true };
      }

      //using regular expression(reg-ex) for better validation
      if (body.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
        user.email = body.email;
        changed = { ...changed, email: true };
      }

      //the crucial part for save data in DB
      await user.save();

      return res.status(201).json({ message: "success", ...changed });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      if (!result)
        return res
          .status(404)
          .json({ message: "user not found" });

      return res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) res.send(`user not found`);

  const html = `
    ${user
      .map(
        user => `
        <ul>
        <li>${user.first_name}</li>
        <li>${user.ip_address}</li>
        <li>${user.job_title}</li>
        </ul>
        
        `
      )
      .join("")}`;
  res.send(html); //ssr => server-side rendering
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.email || !body.job_title) {
    return res
      .status(400)
      .json({ message: "first_name, email, job_title are required.." });
  }
  /*
    users.push({ id: users.length + 1, ...body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>
        res.json({ status: "success", id: users.length })
    );
  */
  const result = await User.create({
    first_name: body.first_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
    ip_address: body.ip_address
  });
  console.log(result);
  return res.status(201).json({ message: "success" });
});

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}/`)
);
