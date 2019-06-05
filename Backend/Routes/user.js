const express = require('express');
const router = express.router;
const controllers = require('../Controllers');
const jwt = require('jsonwebtoken');


router.post('/signup', controllers.user.signup);

router.post('/login', controllers.user.login);

// Update User 
router.put('/:id', controllers.user.update);

// Delete User 
router.delete('/:id', controllers.user.delete);

// Sending JWT Token on request 
router.use((request,response,next)=>{
    console.log('Activating JWT MiddleWare');
    //grabs 'authorization' part of the request header
    const bearerHeader = request.headers['authorization'];
    console.log(`Token Check:${bearerHeader}`);

    if(typeof bearerHeader !== 'undefined'){
        // breaks up request header 'Bearer <token>' into separate parts
        const bearer = bearerHeader.split(' ');
        // stores token
        const bearerToken = bearer[1];
        // stores token in request
        request.token = bearerToken;
        // verifies token against secret key
        // if secret key is inside the signature part of the token, it will open the payload have access to request data
        console.log('request.token: ', request.token);
        let verified = jwt.verify(request.token,'saintamy');
        console.log(verified);
        console.log(`here is the verified: ${verified._id}`);
        // pulls out user id from token
        request.userId = verified._id;
        console.log(request.userId);
        next();
    }else {
        response.sendStatus(403);
    }

})

// show user's profile
router.get('/', controllers.user.show);

module.exports = router;

