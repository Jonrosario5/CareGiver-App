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

// ************* USER ROUTES ************

// ALL USERS (Admin User Only)
app.get('/api/allusers', (request, response)=> {
    db.User.find().exec((err,users)=>{
        if(err){
            throw err;
        }
        console.log(users);
        response.json(users);
    })
})



// Create User

app.post('/api/newuser',(request,response)=>{
    db.User.create()
})

// Edit User

app.put('/api/editProfile/:id',(request,response)=>{
    const userId = request.params.id;
    db.User.findOneAndUpdate({_id:userId},
        request.body,
        {new:true},
        (err, updatedUser)=> {
            if(err){
                return console.log(`This error has ocurred:${err}`)
            }
            response.json(updatedUser);
        })
})

// Delete A User Coming 

// Find a User 

// ********* POST ROUTES ********* 

// Get All Posts

app.get('/api/post',(request,response)=>{
    db.Post.find().exec((err,posts)=>{
        if(err){
            return console.log(err);
        }
        console.log(posts);
        response.json(posts);
    })
})

//  Create a Post 

app.post('/api/:id/postCreate',(request,response)=>{
    let userId = request.params.id
    console.log(request.body);

    newPost = new db.Post({
        userId: userId,
        isFilled:false,
        isPast:false,
        details:request.body.details,
        postedRate:request.body.postedRate
    });
    db.Post.create(newPost,(err,newPost)=>{
        if(err){
            return console.log(`this error has occurred:${err}`)
        }
        console.log("New Post Created")
    })
    response.json("Done");
})


// ***** Comments 



// ******* RATINGS ROUTES

app.post('/api/createRating',(request,response)=>{
    console.log("Hi")
})


// Start Server

app.listen(3000,()=>{
    console.log("HTTP server is listen at localhost:3000")
})