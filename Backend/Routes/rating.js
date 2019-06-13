const express = require('express');
const router = express.Router();
const controllers = require('../Controllers');

// Show All Ratings 

router.get('/:postId',controllers.rating.show);

//  Create Post

router.post('/:raterId/:rateeId/:postId', controllers.rating.create);

// Add Comment

router.put('/:ratingId',controllers.rating.addComment);

//  Delete Rating

router.delete(':/ratingId', controllers.rating.delete);

module.exports = router;