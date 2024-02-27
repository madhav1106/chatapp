import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {id: receiverId} = req.params;
        const {message} = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId, receiverId, message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('new-message', newMessage);
        }

        res.status(201).json(newMessage);

    } catch(error) {
        console.error("Error in send message", error.message);
        res.status(500).json({error: "Inernal server error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userId} = req.params;
        const senderId = req.user._id;
        let data = [];
        if(userId !== senderId) {
            const conversation = await Conversation.findOne({
                participants: {$all: [senderId, userId]},
            }).populate("messages");
            if(conversation) {
                data = conversation.messages;
            }
        }

        res.status(200).json(data);
    } catch(error) {
        console.error("Error in get messages", error.message);
        res.status(500).json({error: "Inernal server error"});
    }
}