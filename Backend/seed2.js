const db = require('./Models');

const userId1 = "5cf57bfd42bc2c083d78dbfc";
const userId2 = "5cf57bfd42bc2c083d78dbfd";

const user1Post = {
    userId:userId1,
    isFilled:false,
    header:"Caregiver Needed",
    isPast:false,
    postedRate:"$15/hour",
    details:"I'll be in the hospital bar. You know there isn't a hospital bar, Mother. Well, this is why people hate hospitals. I made a huge tiny mistake. Look, you are playing adults…with fully formed libidos, not 2 young men playing grab-ass in the shower. He's going to be all right. Buster's in what we like to call a light to no coma. In laymans terms, it might be considered a very heavy nap. I thought the two of us could talk man-on-man. She wanted to look 48. I nearly airbrushed her into oblivion. Ended up checking 'albino' on the form. If I wanted something your thumb touched, I'd eat the inside of your ear."

};





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