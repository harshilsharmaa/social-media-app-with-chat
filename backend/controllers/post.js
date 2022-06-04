const Post = require("../models/post");
const User = require("../models/User");

const cloudinary = require('cloudinary') 

exports.createPost = async (req, res)=> {
    try {

        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "posts",
        });
        
        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            
            owner: req.user._id,
        }

        const post = await Post.create(newPostData);
        
        const user = await User.findById(req.user._id);
        user.posts.unshift(post._id);

        await user.save();
    
        res.status(200).json({
            status: "success",
            message: "Post Created"
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.likeAndUnlikePost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id);


        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        if(post.likes.includes(req.user._id)){
            
            const index = post.likes.indexOf(req.user._id);

            post.likes.splice(index,1);

            await post.save();

            res.status(200).json({
                success: true,
                message: "Post unliked"
            })
        }
        else{
            post.likes.push(req.user._id);

            await post.save();

            res.status(200).json({
                success: true,
                message: "Post liked"
            })
        }



    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.deletePost = async(req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id); 

        await post.remove();

        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(post._id);

        user.posts.splice(index,1);

        await user.save();


        res.status(200).json({
            message: "Post deleted",
            success: true
        })


        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.getPostOfFollowing = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner:{
                $in: user.following,
            }
        }).populate("owner likes comments.user");

        if(!posts){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        res.status(200).json({
            success: true,
            posts:posts.reverse(),
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.updateCaption = async(req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }

        post.caption = req.body.caption;

        await post.save();

        res.status(200).json({
            message: "Post updated",
            success: true,
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.addComment = async(req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        let commentIndex = -1;
        post.comments.forEach((item,index)=> {
            if(item.user.toString() === req.user._id.toString()){
                commentIndex = index;
            }
        })

        if(commentIndex!==-1){

            post.comments[commentIndex].comment = req.body.comment;

            await post.save();

            return res.status(400).json({
                message: "commente updated",
                success: false
            })
        }

        else{
            post.comments.push({
                user: req.user._id,
                comment : req.body.comment
            })
        
            await post.save();

            res.status(200).json({
                message: "Comment added",
                success: true,
            })
        }

        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
} 



exports.deleteComment = async(req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        if(post.owner.toString() === req.user._id.toString()){

            console.log(req.body.data.commentID);

            if(req.body.commentID == undefined){
                return res.status(400).json({
                    message: "Comment ID is required",
                    success: false
                })
            }

            post.comments.forEach((item,index)=> {
                if(item._id.toString() === req.body.commentID.toString()){
                    return post.comments.splice(index,1);
                }
            });

            await post.save();

            res.status(200).json({
                message: "Selected Comment has deleted",
                success: true,
            })
        }
        else{


            post.comments.forEach((item,index)=> {
                if(item.user.toString() === req.user._id.toString()){
                    return post.comments.splice(index,1);
                }
            });

            await post.save();

            res.status(200).json({
                message: "Your Comment has deleted",
                success: true,
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}