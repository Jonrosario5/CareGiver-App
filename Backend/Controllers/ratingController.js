const bcrypt = require('bcrypt');
const db = require('../Models');
const jwt = require('jsonwebtoken');

module.exports = {

    show:(request,response) => {
        db.Ratings.find({post:request.params.postId})
        .populate('rater')
        .populate('ratee')
        .populate('post')
        .exec((err,ratings)=>{
            if(err){
                return console.log(`Err:${err}`)
            }
            response.json(ratings);
        })
    },

    create:(request,response)=>{
        console.log(request.body.initialComment)
        const newRatings = new db.Ratings({
        rateValue:request.body.rateValue,
        rater:request.params.raterId,
        ratee:request.params.rateeId,
        post:request.params.postId,
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

     },

     addComment:(request,response)=>{
        let newComments = request.body.comments[0]
    
        db.Ratings.findById({_id:request.params.id},(err,foundPost)=>{
            if(err){
                console.log(err)
            }
            foundPost.comments.push(newComments);
            foundPost.save((err,updatedPost)=>{
                if(err){
                    console.log(`Updating Comment Err:${err}`)
                }
                response.json(updatedPost)
            })
        })
     },

     delete:(request,response)=>{
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
     }
}