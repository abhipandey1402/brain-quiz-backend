import mongoose, { Schema } from "mongoose";

const leaderboardSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: false,
            trim: true,
        },
        score: {
            type: Number,
            required: true,
        },
        rank: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);


export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);


