import { asyncHandler } from "../utils/asyncHandler.js";
import { Test } from '../models/test.model.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Question } from "../models/question.model.js";


const saveTestResult = asyncHandler(async (req, res) => {
    const {
        answers,
        topic,
        difficulty,
        numberOfQue,
        testTotalDuration,
        testSubmisionDuration,
        status,
    } = req.body;

    const allQuestions = await Question.find();

    let score = 0;
    let correctAns = 0;
    let inCorrectAns = 0;
    const attemptedQuestions = [];


    const updatePromises = await Promise.all(answers.map(async (answer) => {
        const question = allQuestions.find((q) => q._id.equals(answer.questionId));

        if (question) {
            const isCorrect = question.answer === answer.selectedOption;

            attemptedQuestions.push({
                questionId: question._id,
                question: question.question,
                options: question.options,
                correctAnswer: question.answer,
                selectedOption: answer.selectedOption,
                isCorrect,
            });

            if (isCorrect) {
                switch (question.difficulty.toLowerCase()) {
                    case 'easy':
                        score += 5;
                        break;
                    case 'medium':
                        score += 7;
                        break;
                    case 'hard':
                        score += 10;
                        break;
                    default:
                        score += 5;
                        break;
                }

                correctAns++;

                // Check if the user ID is not already in the attemptedBy array
                const userAlreadyAttempted = question.attemptedBy.includes(req.user._id);

                if (!userAlreadyAttempted) {
                    // Push the user ID to the attemptedBy array only when the answer is correct and the user ID is not already present
                    await Question.updateOne(
                        { _id: question._id },
                        { $push: { attemptedBy: req.user._id } }
                    );
                }
            } else {
                inCorrectAns++;
            }
        }
    }));


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
        attemptedQuestions,
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

