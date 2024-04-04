import mongoose, { Schema } from "mongoose";


const connectionSchema = new Schema(
    {
        sender:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['accepted', 'pending'],
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Connection = mongoose.model("Connection", connectionSchema);