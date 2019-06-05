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

// Find a User by id  

app.get('/api/user/:id',(request,response)=>{
    let userId = request.params.id;
    db.User.findById({_id:userId},(err,foundUser)=>{
        if(err){
            return console.log(`Error Retrieving User:${err}`)
        }
        console.log(`Found User:${foundUser}`)
        response.json(foundUser);
    })
})

// Find User by Name

app.get('/api/nameSearch/:query',(request,response)=>{
    let name = request.params.query;  
    console.log(name);
    db.User.findOne({
        $or:[
            {userName:name},
            {fullName:name},
            {userEmail:name}
        ]
    },(err,foundUser)=>{
        if(err || !foundUser ){
            console.log(`Error Retrieving User:${err}`)
            response.send("That User Does Not Exist")
        }else{
            console.log(`Found User:${foundUser}`)
            response.json(foundUser);  
        }

    })
})

// Fine Users by UserCerts

// app.get('/api/certs/:certs',(request,response)=>{
//     let certs = request.params.certs;
//     console.log(certs)
//     db.User.find({userCerts:},(err,foundUsers)=>{
//         if(err || !foundUsers){
//             console.log(`Error Retrieving User:${err}`);
//             response.send("Sorry, No Current Users Have Those Certificates")
//         }else{
//             console.log(`Found Users: ${foundUsers}`)
//             response.json(foundUsers);
//         }
//     })
// });

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

// Delete User  

app.delete('/api/removeUser/:id',(request,response)=>{
    let userId = request.params.id;
    db.User.findByIdAndDelete({_id: userId },(err,deletedUser)=>{
        if(err){
            return console.log(`user not deleted:${err}`)
        }
        console.log(`User Removed: ${deletedUser}`);
        response.json(deletedUser);
    })
})


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

// Update a Post

app.put('/api/editPost/:id',(request,response)=>{
    const postId = request.params.id;
    db.Post.findOneAndUpdate({_id:postId},
        request.body,
        {new:true},
        (err, updatedPost)=> {
            if(err){
                return console.log(`This error has ocurred:${err}`)
            }
            response.json(updatedPost);
        })
})

// Delete a Post 

app.delete('/api/removePost/:id',(request,response)=>{
    const postId = request.params.id;
    db.Post.findByIdAndDelete({_id:postId},(err,deletedPost)=>{
        if(err){
            console.log(`Error Removing Post:${deletedPost}`)
            response.send("Error Deleting Post")
        }else {
            response.json(deletedPost);
            console.log(`Post Removed:${deletedPost}`)
        }

    })
})


// ******* RATINGS ROUTES

// Get All Ratings

app.get('/api/ratings', (request, response)=> {
    db.Ratings.find().populate('post')
    .exec((err,ratings)=>{
        if(err){
            throw err;
        }
        console.log(ratings);
        response.json(ratings);
    })
})

//  Create a Rating 

app.post('/api/createRating',(request,response)=>{
    console.log(request.body.initialComment)
    const newRatings = new db.Ratings({
        rateValue:request.body.rateValue,
        rater:request.body.rater,
        ratee:request.body.ratee,
        post:request.body.post,
        initialComment:{
            body:request.body.initialComment,
            isLiked:false
        },
        comments:[]
    })
    db.Ratings.create(newRatings,(err,newRatings)=>{
        if(err){
            console.log(`Error Creating Rating:${newRatings}`)
            response.send(`Error Creating Rating${err.message}`)
        }else {
            console.log(`New Rating Created:${newRatings}`);
            response.json(newRatings)
        }
    })
})

// Add Comment to Rating 

app.put('/api/addComments/:postId/:commentId',(request,response)=>{
    let newComment = request.body.comment;
    let commentId = request.params.commentId
    db.Ratings.findOne({_id:request.params.id},(err,foundRating)=>{
        if(err){
            console.log(`Error Occurred:${err}`)
            response.send('Error Creating New Comment')
        } 
        let comments = foundRating.comments
        if(!commentId){
            comments.push(newComment)
        } else {
            for(i = 0;i < comments.length;i++){
                if(comments[i]._id === commentId){
                    comments[i] === newComment
                }
            }
        }
});
});

// Delete a Rating 

app.delete('/api/removeRating/:id',(request,response)=>{
    const postId = request.params.id;
    db.Ratings.findByIdAndDelete({_id:postId},(err,deletedRatings)=>{
        if(err){
            console.log(`Error Removing Rating:${deletedRatings}`)
            response.send("Error Deleting Rating")
        }else {
            response.json(deletedRatings);
            console.log(`Post Removed:${deletedRatings}`)
        }

    })
})



// Start Server

app.listen(3000,()=>{
    console.log("HTTP server is listen at localhost:3000")
})