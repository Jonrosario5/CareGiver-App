const bcrypt = require('bcrypt');
const db = require('../Models');
const jwt = require('jsonwebtoken');

module.exports = {
    showAllPost: (request,response) => {
        db.Post.find().exec((err,posts)=>{
            if(err){
                return console.log(err);
            }
            console.log(posts);
            response.json(posts);
        });
    },

    showOnePost: (request, response) =>{
        db.Post.findById({_id:request.params.id}, (err,foundPost)=>{
            if(err){
                console.log(`Error Finding Post : ${err}`);

            }
            response.json(foundPost);
            console.log(`Post: ${foundPost}`);
        })
    },

    create: (request,response)=>{
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
        response.json({
            message:`New Post Created`,
            newPost
        });
    },

    update: (request,response) =>{
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
    },

    deletePost: (request,response) =>{
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

    }

}