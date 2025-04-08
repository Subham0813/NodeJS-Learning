//our main file
// const fs = require("fs");
// const http = require("http");
// const url = require("url");



//we dont need this anymore as we using Express framework it helps to declutter and provide rich feature to help use code maintainable easily

/*
function myServerHandler(request, response) {
    if (request.url === "/favicon.ico") return response.end();
    const log = `${Date.now()} : ${request.url} - New Request recieved`;
    const myUrl = url.parse(request.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        //creating routes
        switch (myUrl.pathname) {
            case "/":
                response.end("Home Page");
                break;
                case "/about":
                    response.end(`I'm Subham from Kolkata, Learning Backend with Piyush`);
                    break;
                    case "/contact":
                        response.end("Contact us @Yt/Piyushgarg");
                        break;
                        case "/search":
                            const query = myUrl.query;
        response.end(`Hi ${query.myName}, hope You're doing well..`);        //we do other way in express
        break;
        default:
            response.end("404 - NOT FOUND");
            }
            });
            }
            
            
            //create our web server
            const myServer = http.createServer(myServerHandler);
            
            myServer.listen(8001, () => console.log("server started.."));
            
            */

//we do the following

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("hello from Home page Express");
});

app.get("/about", (req, res) => {
  return res.send(`I'm Subham from Kolkata, Learning Backend with Piyush`);
});
app.get("/contact", (req, res) => {
  return res.send("Contact us @Yt/Piyushgarg");
});
app.get("/search/:myName", (req, res) => {
    const name = req.params.myName;
  res.send(`Hi ${name}, hope You're doing well..`);
});

app.listen(8001, () =>
  console.log(`server started at http://localhost:8001/ `)
);
