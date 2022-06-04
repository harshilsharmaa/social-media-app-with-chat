const User = require("../models/User");
const Post = require("../models/Post");
const crypto = require("crypto"); 
const {sendEmail} = require("../middleware/sendEmail");

const cloudinary = require('cloudinary') ;

exports.register = async(req,res)=>{

    try {

        const {name, email, password} = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "users",
        });

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        user = await User.create({
            name,
            email,
            password, 
            avatar:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
        });


        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            message: "User Successfully registered",
            user,
            success: true,
        })
        
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false
        })
    }
}


exports.login = async(req,res)=>{
    try {

        const {email, password} = req.body;

        const user = await  User.findOne({email}).select("+password").populate("posts followers following");

        if(!user){
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            message: "Login successful",
            user,
            success: true,
        })


        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.logout = async(req,res)=>{
    try {
        
        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.followUser = async(req,res)=>{

    try {

       const userToFollow = await User.findById(req.params.id);

       const loggedInUser = await User.findById(req.user._id);

       if(!userToFollow){
           return res.status(404).json({
               message: "User not found",
               success: false
           })
       }

       if(loggedInUser.following.includes(userToFollow._id)){
            const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
            const indexFollower = userToFollow.followers.indexOf(loggedInUser._id);

            loggedInUser.following.splice(indexFollowing,1);
            userToFollow.followers.splice(indexFollower,1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "User Unfollowed"
            })
       }
       else{
            loggedInUser.following.push(userToFollow._id);
            loggedInUser.save();
    
            userToFollow.followers.push(loggedInUser._id);
            userToFollow.save();
    
            
    
            res.status(200).json({
                message: "User successfully followed",
                success: true
            })
       }

       

        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.updatePassword = async(req,res)=>{
    
    try {

        const user = await User.findById(req.user._id).select("+password");


        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){  
            return res.status(400).json({
                message: "Please provide both old and new password",
                success: false
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if(!isMatch){
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            message: "Password successfully updated",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.updateProfile = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);

        const {name, email, avatar} = req.body;

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }


        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder:"users"
            })

            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();

        res.status(200).json({
            message: "Profile successfully updated",
            success: true
        })        

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.deleteMyProfile = async(req,res)=>{

    try {

        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const userId = user._id;
        const followers = user.followers;
        const following = user.following;

        // removing avatar from cloudinary

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);



        await user.remove();

        // logout User after deleting profile
        res.cookie("token", null, {expires:new Date(Date.now()), httpOnly:true});


        // Deleting all post of the user
        for(let i=0; i<posts.length; i++){
            const post = await Post.findById(posts[i]);
            await cloudinary.v2.uploader.destroy(post.image.public_id);
            await post.remove();
        }

        // removing user from follower's following
        for(let i=0; i<followers.length; i++){

            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId);
            follower.following.splice(index,1);
            await follower.save();
        }

        // removing user from following's followers
        for(let i=0; i<following.length; i++){
            const follows = await User.findById(following[i]);

            const index = follows.followers.indexOf(userId);
            follows.followers.splice(index,1);
            await follows.save();
        }

        // Removing comments of user from all posts

        const allPosts = await Post.find();

        for(let i=0;i<allPosts.length;i++){
            const post = await Post.findById(allPosts[i]._id);
            
            for(let j=0;j<post.comments.length;j++){
                if(post.comments[j].user===userId){
                    post.comments.splice(j,1);
                }
            }

            await post.save();
        }

        // Removing likes of user from all posts

        for(let i=0;i<allPosts.length;i++){
            const post = await Post.findById(allPosts[i]._id);
            
            for(let j=0;j<post.likes.length;j++){
                if(post.likes[j].user===userId){
                    post.likes.splice(j,1);
                }
            }

            await post.save();
        }



        res.status(200).json({
            message: "Profile successfully deleted",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.myProfile = async(req,res)=>{

    try {

        const user = await User.findById(req.user._id).populate("posts followers following");

        res.status(200).json({
            message: "User profile",
            user,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.getUserProfile = async(req,res)=>{

    try {

        const user = await User.findById(req.params.id).populate("posts followers following");

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }



        res.status(200).json({
            message: "User profile",
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getAllUsers = async(req,res)=>{

    try {
        
        const users = await User.find({name: {$regex: req.query.name, $options:"i"}});

        res.status(200).json({
            message: "All users",
            users,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    } 
}


exports.getMyPosts = async(req,res)=>{

    try {
        
        const user = await User.findById(req.user._id);

        const posts = [];

        for(let i=0;i<user.posts.length;i++){
            const post = await Post.findById(user.posts[i]).populate('likes comments.user owner');
            posts.push(post)
        }

        res.status(200).json({
            success:true,
            posts,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    } 
}

exports.getUserPosts = async(req,res)=>{

    try {

        
        const user = await User.findById(req.params.id);

        const posts = [];

        for(let i=0;i<user.posts.length;i++){
            const post = await Post.findById(user.posts[i]).populate('likes comments.user owner');
            posts.push(post)
        }

        res.status(200).json({
            success:true,
            posts,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    } 
}

exports.forgotPassword = async(req,res)=>{


    try{

        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;


        try {
            await sendEmail({
                email: user.email,
                subject: "Password reset token",
                message
            });

            res.status(200).json({
                message: `Email sent to ${user.email}`,
                success: true
            })
        }
        catch(error){

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(500).json({
                message: error.message,
                success: false
            })
        }


    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

exports.resetPassword = async(req,res)=>{

    try {

        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},
        })

        if(!user){
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false
            })
        }

        if(req.body.password ===undefined){
            return res.status(400).json({
                message: "Password is required",
                success: false
            })
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: "Password successfully updated",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
        
}


exports.updateLastSeen = async(req,res)=>{
        try {
    
            const user = await User.findById(req.params.id);
    
            user.lastSeen = Date.now();
    
            await user.save();
    
            res.status(200).json({
                message: "Last seen updated",
                success: true
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            })
        }
}