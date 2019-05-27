// Requirements 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./Models');



// Middleware
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())



// Admin User Only 
app.get('/allusers', (request, response)=> {
    db.User.find().exec((err,users)=>{
        if(err){
            throw err;
        }
        console.log(users);
        response.json(users);
    })
})

// Create User

app.post('/newuser',(request,response)=>{
    db.User.create()
})

// Start Server

app.listen(3000,()=>{
    console.log("HTTP server is listen at localhost:3000")
})