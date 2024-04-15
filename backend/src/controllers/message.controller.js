import Conversation from "../models/conversation.model.js";
import {Message} from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res) => {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

        if(!message) {
            throw new ApiError(400, "message is required");
        }

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			sender: senderId,
			receiver: receiverId,
			content: message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(
            new ApiResponse(200, newMessage, 'Message sent successfully')
        );
});

export const getMessages = asyncHandler(async (req, res) => {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json(
			new ApiResponse(200, [], 'Messages fetched successfully')
		);

		const messages = conversation.messages;

		res.status(200).json(
            new ApiResponse(200, messages, 'Messages fetched successfully')
        );
});