import mongoose, { Schema } from "mongoose";

const leaderboardSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        score: {
            type: Number,
            required: true,
        },
        rank: {
            type: Number,
            required: true,
        },
        testId: {
            type: Schema.Types.ObjectId,
            ref: "Test",
        },
    },
    {
        timestamps: true,
    }
);


export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);


