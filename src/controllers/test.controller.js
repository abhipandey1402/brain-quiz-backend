import { asyncHandler } from "../utils/asyncHandler.js";
import { Test } from '../models/test.model.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Leaderboard } from "../models/leaderboard.model.js";


const saveTestResult = asyncHandler(async (req, res) => {
    const {
        topic,
        difficulty,
        numberOfQue,
        correctAns,
        inCorrectAns,
        testTotalDuration,
        testSubmisionDuration,
        score,
        status,
    } = req.body;

    // Create a new test instance
    const test = new Test({
        attemptedBy: req.user._id,
        topic,
        difficulty,
        numberOfQue,
        correctAns,
        inCorrectAns,
        testTotalDuration,
        testSubmisionDuration,
        score,
        status,
    });

    const savedTest = await test.save();

    await User.findByIdAndUpdate(
        req.user._id,
        { $push: { test: savedTest } },
        { new: true }
    );

    // Update totalScore by adding the test score
    await User.findByIdAndUpdate(
        req.user._id,
        { $inc: { totalScore: score } },
        { new: true }
    );

    if (!savedTest) {
        throw new ApiError(401, "failed to save test")
    }

    return res.status(200)
        .json(new ApiResponse(200, savedTest, "Saved test result successfully"))
})

const getTestResultByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params

    const testResults = await Test.find({ status })

    if (!testResults) {
        throw new ApiError(404, "No test results found with given status")
    }

    return res.status(200)
        .json(new ApiResponse(200, testResults, "Successfully fetched test results"))
})

export { saveTestResult, getTestResultByStatus }

