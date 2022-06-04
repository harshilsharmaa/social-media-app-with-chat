const Conversation = require("../models/Conversation");

// new Conversation
exports.newConversation = async(req,res)=>{
    try {

        // to check if conversation exist
        const oldConversations = await Conversation.find({ 
            members: {
                $all: [req.body.senderId, req.body.receiverId]
            }
        })

        if(oldConversations.length > 0){
            return res.status(200).json({
                success: true,
                exist:true,
                oldConversations
            })
        }

        // If not exist then create new conversation
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        })

        const conversation = await newConversation.save();

        res.status(200).json({
            success: true,
            conversation
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



// get conversation of a user

exports.getConversations = async(req,res)=>{
    try {

        const conversations = await Conversation.find({
            members: {
                $in: [req.params.userId]
            }
        })

        res.status(200).json({
            success: true,
            conversations
        })
        
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}
// get conversation include two users

exports.getConversationsOfTwoUser = async(req,res)=>{
    try {

        const conversations = await Conversation.find({ 
            members: {
                $all: [req.params.firstUserId, req.params.SecondUserId]
            }
        })

        res.status(200).json({
            success: true,
            conversations
        })
        
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}