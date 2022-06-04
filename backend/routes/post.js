const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/auth');
const {createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, addComment, deleteComment} = require('../controllers/post');

router.route('/post/upload').post(isAuthenticated ,createPost);

router.route('/post/:id')
.post(isAuthenticated ,likeAndUnlikePost)
.put(isAuthenticated ,updateCaption)
.delete(isAuthenticated ,deletePost);

router.route('/posts').get(isAuthenticated, getPostOfFollowing); 

router.route('/post/comment/:id')
.put(isAuthenticated, addComment)
.delete(isAuthenticated, deleteComment);



module.exports = router;