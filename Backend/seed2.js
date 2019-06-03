const db = require('./Models');

const userId1 = "5cec4dda6cb16d075481690b";
const userId2 = "5cec4dda6cb16d075481690a";

const user1Post = {
    userId:userId1,
    isFilled:false,
    isPast:false,
    postedRate:"$15/hour",
    comments:[
        {
            body:"Testing that this works",
            userId:userId2
        }
    ]
};

const userComments = 
            {
            body:"Testing that this works",
            userId:userId2
        };
        // {
        //     body:"Damn Right this shit works",
        //     userId:userId1
        // }





db.Post.deleteMany({}, (err,user)=>{
    if (err){
        console.log(`"Post not created:${err}"`);
    } console.log("Posts removed");
    db.Post.create(user1Post,(err,newPost)=>{
        if(err){
            console.log(`"Could not create user:${err}"`)
        } 
        console.log(newPost);
        console.log("We have our first post!")
    })
});