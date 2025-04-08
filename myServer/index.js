//our main file
const fs = require('fs');
const http = require('http');

//create our web server
const myServer = http.createServer((request, response) => {
    const log = `${Date.now()} : ${request.url} - New Request recieved`
    fs.appendFile('log.txt', log, (err, data) => {
        //creating routes
        switch(request.url){
            case '/': 
                response.end('Home Page');
                break;
            case '/about': 
                response.end(`I'm Subham from Kolkata, Learning Backend with Piyush`);
                break;
            case '/contact': 
                response.end('Contact us @Yt/Piyushgarg');
                break;
            default:
                response.end('404 - NOT FOUND');

        }
    })
});

//our port
myServer.listen(8000, () => console.log('server started..'));