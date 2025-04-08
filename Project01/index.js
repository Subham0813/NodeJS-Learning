const express =require('express')
let users = require('./assets/MOCK_DATA.json')
const fs = require('fs')

const app = express()
const port = 8003

// ** middleware / plugins to help our post req call
app.use(express.urlencoded({extended : false})) //built-in middleware

//custom middleware or basic middleware
app.use((req, res, next) => {
    console.log('hello from Middleware')
    next()
})

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
    console.log('hello from Middleware')
    fs.appendFile('./log.txt', 
        `${Date.now()} : ${req.ip} - ${req.method} - ${req.path}\n`,
        (err) => next()
    ) 
})

//Routes
app.get('/', (req, res) => res.send(`Welcome to LocalHost: ${port}`))

//hybrid request can use in various platforms like iot, browsers, mobiles etc
app.get('/api/users', (req, res) => res.json(users));


//server side rendering : only works on browsers as it's always return HTML
app.get('/users', (req, res) => {
    const html = `
    ${users.map(user => `
        
            <ul>
                <li>${user.first_name}</li>
                <li>${user.ip_address}</li>
                <li>${user.job_title}</li>
            </ul>
        
        `).join('')}`;
    res.send(html)
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


app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id)
    return res.json(users.filter((user) => id === user.id))
})
.patch((req,res) => {

        //users can only change first_name, email, job_title and restricted to change other fields
        const id = Number(req.params.id)
        const body = req.body

        let user = users.find(user => user.id === id)
        if(!user) return res.status(404).json({status : error, message: 'user not found'})
        
        if(body.first_name && body.first_name.length>1){
            user.first_name = body.first_name
        }

        if(body.job_title && body.job_title.length>1){
            user.job_title = body.job_title
        }

        //using regular expression(reg-ex) for better validation
        if(body.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)){   
            user.email = body.email
        }
            
        fs.writeFile('./MOCK_DATA.json', 
            JSON.stringify(users), 
            (err, data) => res.json({status: "success"})
        )
            
})
.delete((req,res) => {

    const id = Number(req.params.id)
    const body = req.body

    let user = users.find(user => user.id === id)
    if(!user) return res.status(404).json({status : error, message: 'user not found'})
    
    users = users.filter(user => user.id !== id)
    fs.writeFile('./MOCK_DATA.json', 
        JSON.stringify(users), 
        (err, data) => res.json({status: "success"})
    )
})



app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const filteredUser = users.filter((user) => id === user.id)
    const html = `
    ${filteredUser.map(user => `
        <ul>
        <li>${user.first_name}</li>
        <li>${user.ip_address}</li>
        <li>${user.job_title}</li>
        </ul>
        
        `)
        .join("")
    }`;
    res.send(html) //ssr => server-side rendering
})
    

app.post('/api/users', (req,res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.email || !body.job_title) return res.status(400).json({message : "first_name, email, job_title are required.."})
    users.push({id: users.length+1,...body});

    fs.writeFile('./MOCK_DATA.json', 
        JSON.stringify(users), 
        (err,data) => res.json({status : 'success', id : users.length})
    )
})

app.listen(port, () => console.log(`server started at http://localhost:${port}/`))