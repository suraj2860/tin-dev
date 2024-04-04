import { Connection } from "../models/connection.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const sendRequest = asyncHandler(async (req, res) => {
    const receiverId = req.params?.receiverId;

    const receiver = await User.findById(receiverId);

    if(!receiver) throw new ApiError(404, "User not found");

    const conn = await Connection.find({
        sender: req.user?._id,
        receiver: receiver._id,
        status: 'pending'
    });

    if(conn) throw new ApiError(400, "already sent")

    const connection = await Connection.create({
        sender: req.user?._id,
        receiver: receiver._id,
        status: 'pending'
    });

    if(!connection) throw new ApiError(500, "something went wrong while sending request.");

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            connection,
            "connection request sent"
        ));
});

export {
    sendRequest
};