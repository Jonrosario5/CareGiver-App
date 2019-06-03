const db = require('./Models');

const userId1 = "5cf57bfd42bc2c083d78dbfc";
const userId2 = "5cf57bfd42bc2c083d78dbfd";

const newRating = {
    rateValue:3,
    rater:userId2,
    ratee:userId1,
    post:"5cf5748f273d110482962d92",
    initialComment:"Testing this out",
    comments:[{
        body:"Are you serious?",
    },{
        body:"Yup"
    }]

}

db.Ratings.deleteMany({}, (err,rating)=>{
    if (err){
        console.log(`"Rating not created:${err}"`);
    } console.log("Ratings removed");
    db.Ratings.create(newRating,(err,rating)=>{
        if(err){
            console.log(`"Could not create rating:${err}"`)
        } 
        console.log(rating);
        console.log("We have our first rating!")
    })
});