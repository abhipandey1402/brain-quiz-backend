import { asyncHandler } from "../utils/asyncHandler.js";
import { Leaderboard } from "../models/leaderboard.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getLeaderboard = asyncHandler(async (req, res) => {

    const leaderboard = await Leaderboard.find().sort({ score: -1 });

    if (!leaderboard) {
        throw new ApiError(404, "Leaderboard not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, leaderboard, "Leaderboard fetched successfully"))
})

const refreshLeaderboard = asyncHandler(async (req, res) => {

    const sortedUerByTotalScore = await User.find().sort({ totalScore: -1 });

    // Use bulkWrite to update multiple records in Leaderboard
    const bulkWriteOperations = sortedUerByTotalScore.map(({ _id, username, totalScore }, index) => ({
        updateOne: {
            filter: { _id },
            update: { $set: { userId: _id, username: username, score: totalScore, rank: index + 1 } },
            upsert: true, // Create a new record if userId doesn't exist
        },
    }));

    const result = await Leaderboard.bulkWrite(bulkWriteOperations);

    if (!result) {
        throw new ApiError(401, "Leaderboard refresh failed")
    }

    return res.status(200)
        .json(new ApiResponse(200, result, "Leaderboard successfully refreshed"))
})

export { getLeaderboard, refreshLeaderboard }
