const express = require('express');
const router = express.Router();
const controllers = require('../Controllers');


// Show All Posts

router.get('/',controllers.post.showAllPost);

// Show One Post 

router.get('/postId', controllers.post.showOnePost);

// Create Post

router.post('/:id', controllers.post.create);

// Update Post

router.put('/:id', controllers.post.update);

// Delete

router.delete('/:id', controllers.post.deletePost);

module.exports = router;