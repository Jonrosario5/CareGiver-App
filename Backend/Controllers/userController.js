const bcrypt = require('bcrypt');
const db = require('../Models');
const jwt = require('jsonwebtoken');

module.exports = {
    signup: (request,response) => {
        console.log(`sign up requests: ${request.body}`)
        console.log(`sign up`);
        // check to see if email already exists in DB
        db.Users.find({userEmail:request.body.email}).exec().then( (user)=>{
            if(user.length >= 1){
                return response.status(409).json({
                    message:"Email Already Exists"
                })
            } else {
                // Create hash for the new password to a complexity of 10
                bcrypt.hash(request.body.password, 10, (err, hash)=>{
                    if(err){
                        console.log(`Error Hashing Password:${err}`);
                        response.status(200).json({err});
                    // If Hash is successful, create new User
                    } else {
                        db.User.create({
                            userEmail: request.body.email,
                            userPassword: hash,
                            userType: request.body.userType,
                            fullName: request.body.fullName
                        },(err,newUser)=>{
                            console.log(`New User Info:${newUser}`)
                            if(err){
                                return response.status(500).json({err})
                            }
                            // Putting new user data into variable to create token, don't need all properties of User Schema
                            let user = {
                                email:newUser.email,
                                _id: newUser._id
                            }; 
                            console.log(user)
                            // Create new Token
                            // user is payload, 'saintamy' is secret key, and {options}
                            jwt.sign(user,'saintamy',{expiresIn:'1hr'},(error, signedJwt)=>{
                                if(err){
                                    console.log(`Err occurred on JWT token:${err}`);
                                };
                                response.status(200).json({
                                    message:'User Created',
                                    user,
                                    signedJwt
                                });
                            });
                        });// end of db.Users.create method
                    };  // end of if/else statement in bcrypt.hash
                }); // end of bcrypt.hash
            };  // end of i/else statement in db.Users.find
            // end of db.Users.find.then method
        }).catch((err)=>{
            console.log(`signup db.Users.find.catch:${err}`);
            response.status(500).json({err});
        });
    },

    login: (request,response) => {
        console.log('login');
        // login request 
        console.log(`Login Request: ${request.body}`);
        // .select('+userPassword') begins password up from DB for comparison to check for login
        db.User.find({userEmail:request.body.email}).select('+userPassword').exec().then((users)=>{
            console.log(`Users:${users}`);
            // if no user is found
            if(users.length < 1){
                return response.status(401).json({
                    message:'Email/Password Incorrect',
                });
            }; 
            // if user is found 
            console.log(`Login Request Body: ${request.body}`);
            // Hashed Password
            console.log(`Login Hashed Password: ${users[0].userPassword}`);
            // Comparing Hashed Passwords from Login to DB 
            bcrypt.compare(request.body.password, users[0].userPassword, (err,match)=>{
                if(err){
                    console.log(`Error at Login Bcrypt Compare:${err}`);
                    return respsonse.status(500).json({err});
                };
                // if password matches
                if(match){
                    console.log(`Match:${match}`);
                    // create a json web token for user
                    let user = {
                        userEmail:users[0].userEmail,
                        fullName: users[0].fullName,
                        userType: users[0].userType,
                        userRatings: users[0].userRatings,
                        userSchedule: users[0].userSchedule,
                        userCerts: users[0].userCerts,
                        userResume: users[0].userResume,
                        _id: users[0]._id,
                    };
                    console.log(user);
                    jwt.sign(user,'saintamy',{expiresIn: '1h'},(err,signedJwt)=>{
                        if(err){
                            console.log(`Error at Login Jwt Token:${err}`)
                            return response.status(500).json({err});
                        }
                        response.status(200).json({
                            message:"Login Successful",
                            user,
                            signedJwt
                        });
                    });
                    // if password does not match
                } else{
                    console.log('Not a Match');
                    response.status(401).json({
                        message:'Email/Password Incorrect'
                    });
                }; // end of if/else statemnt in bcrypt.compare
            }); // end of bcrypt.compare method
             // end of db.Users.find.then method
        }).catch((error)=>{
            console.log('login db.users.find.catch: ', error);
            response.status(500).json({error});
        });
    },

    show: (request,response) => {
        console.log('Show');
        // User ID from request
        console.log(request.userId);
        if(request.userId){
            db.User.findById(request.userId,(err,foundUser)=>{
                if(err){
                    console.log(`Error Finding User:${err}`);
                    response.send("User Not Found");
                };
                // return foundUser
                response.json(foundUser);
                console.log(foundUser);
            })
        } else {
            response.json('No UserID provided');
        };
    },

    update: (request,response) => {
        console.log(`User to Update:${request.params}`);
        console.log(`Items to Update:${request.body}`)
        const userId = request.params.id;
        db.User.findByIdAndUpdate({_id:userId},
            request.body,
            {new:true},
            (err,updatedUser)=>{
                if(err){
                    console.log(`Error Updating User:${err}`);
                };
                response.json(updatedUser);
                console.log(`User Updated:${updatedUser}`);
        });
    },

    delete: (request, response) => {
        const userId = request.params.id;
        console.log(`User To Delete:${userId}`);
        db.User.findOneAndDelete({_id:userId},(err,deletedUser)=>{
            if(err){
                console.log(`Error Deleting User:${err}`);
            }
            response.json(deletedUser);
            console.log(`Deleted User:${deletedUser}`);
        });
    }

};