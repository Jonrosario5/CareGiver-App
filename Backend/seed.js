const db = require('./Models');

const newUser = {
    userName:"Jon",
    fullName:"Jonathan Rosario",
    userEmail:"Jonathan.Rosario@gmail.com",
    userPassword:"red",
    userType:"Consumer",
    patientDetails:{
        patientName:"Kate Katerson",
        patientAilments:"Old Age",
        patientAge:90,
        patienInsurance:"Kaiser",
        patientCareDetails:"Needs a bath 2x/day, and lots of attention",
        location:"San Francisco"
    }
};

db.User.deleteMany({}, (err,user)=>{
    if (err){
        console.log(`"User not created:${err}"`);
    } console.log("Users Removed");
    db.User.create(newUser,(err,user)=>{
        if(err){
            console.log(`"Could not create user:${err}"`)
        } console.log("user created!")
    })
})