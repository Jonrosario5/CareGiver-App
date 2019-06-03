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
    },
    userResume:"Cake",
    userCerts:[
        {certification:"Testing"}
        ,{certification:"Caring"}
        ,{certification:"Tubing"}
    ]
};

const user2 = {
    userName:"Walrus",
    fullName:"Matt Fredman",
    userEmail:"Matt@gmail.com",
    userPassword:"red",
    userType:"Admin",
    patientDetails:{
        patientName:"Patty Jenkins",
        patientAilments:"Diabetes",
        patientAge:98,
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
    db.User.create(user2,(err,user)=>{
        if(err){
            console.log(`"Could not create user:${err}"`)
        } console.log("user2 created!")
    })
});