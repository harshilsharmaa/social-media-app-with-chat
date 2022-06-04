const Message = require('../models/Message');

// add
exports.newMessage = async(req,res)=>{
    try {

        

        const newMessageData =  {
            conversationId:req.body.conversationId, 
            sender: req.body.sender,
            text: req.body.text
        }

        const newMessage = await Message.create(newMessageData);

        await newMessage.populate('sender')

        res.status(200).json({
            success: true,
            message: newMessage
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


// get
exports.getMessages = async(req,res)=>{
    try {

        const allMessages = await Message.find({conversationId: req.params.conversationId}).populate('sender')

        res.status(200).json({
            success: true,
            allMessages
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}