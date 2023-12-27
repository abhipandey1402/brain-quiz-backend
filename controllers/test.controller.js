import { asyncHandler } from "../utils/asyncHandler.js";
import { Test } from '../models/test.model.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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
    const { status } = req.params;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const skip = (page - 1) * size;

    const testResults = await Test.find({ status })
        .skip(skip)
        .limit(size);

    const totalCount = await Test.countDocuments({ status });
    const totalPages = Math.ceil(totalCount / size);

    if (!testResults || testResults.length === 0) {
        throw new ApiError(404, "No test results found with given status");
    }

    return res.status(200)
        .json(new ApiResponse(200,
            {
                data: testResults,
                page,
                size,
                totalPages,
                totalCount,
            }, "Successfully fetched test results"));
});

const getTestResultById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const fetchedTestResult = await Test.findById({ _id: id })

    if (!fetchedTestResult) {
        throw new ApiError(404, "No test result found with given test ID")
    }

    return res.status(200)
        .json(new ApiResponse(200, {
            data: fetchedTestResult
        }, "Test result successfully fetched"))
})

export { saveTestResult, getTestResultByStatus, getTestResultById }

