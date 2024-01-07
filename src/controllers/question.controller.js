import { asyncHandler } from "../utils/asyncHandler.js";
import { Question } from "../models/question.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addQuestion = asyncHandler(async (req, res) => {
    const { question, options, answer, topic, difficulty } = req.body;

    // Create a new question instance
    const newQuestion = new Question({
        question,
        options,
        answer,
        topic,
        difficulty,
    });

    // Save the question to the database
    const savedQuestion = await newQuestion.save();

    if (!savedQuestion) {
        throw new ApiError(401, "failed to add questions")
    }

    return res.status(200)
        .json(new ApiResponse(200, {
            data: savedQuestion
        }, "Successfully added question"))
})

const updateQuestionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { question, options, answer, topic, difficulty } = req.body;

    const existingQuestion = await Question.findById(id)

    if (!existingQuestion) {
        throw new ApiError(404, "Question not found")
    }

    existingQuestion.question = question
    existingQuestion.options = options
    existingQuestion.answer = answer
    existingQuestion.topic = topic
    existingQuestion.difficulty = difficulty

    const updatedQuestion = await existingQuestion.save();

    return res.status(200)
        .json(new ApiResponse(200, {
            data: updatedQuestion
        }, "Question successfully updated"))
})

const deleteQuestionById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedQuestion = await Question.deleteOne({ _id: id })

    if (!deletedQuestion) {
        throw new ApiError(401, "failed to delete Question")
    }

    return res.status(200)
        .json(new ApiResponse(200, {
            data: deletedQuestion
        }, "Question successfully deleted"))
})

const getAllQuestions = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const skip = (page - 1) * size;

    const allQuestions = await Question.find()
        .skip(skip)
        .limit(size);

    const totalCount = await Question.countDocuments();
    const totalPages = Math.ceil(totalCount / size);

    if (!allQuestions) {
        throw new ApiError(404, "No Questions found")
    }

    return res.status(200)
        .json(new ApiResponse(200, {
            data: allQuestions,
            page,
            pageSize: size,
            totalPages,
            totalCount,
        }, "all Questions fetched Successfully"))
})

const getPracticeQuestions = asyncHandler(async (req, res) => {
    const { topic, difficulty, noOfQuestions } = req.params

    const practiceQuestions = await Question.find({
        topic: topic.toLowerCase(),
        difficulty: difficulty.toLowerCase(),
    }).limit(noOfQuestions).select('-answer -attemptedBy');

    if (!practiceQuestions) {
        throw new ApiError(404, "No Question found with given query data")
    }

    return res.status(200)
        .json(new ApiResponse(200, {
            data: practiceQuestions
        }, "Practice Questions fetched successfully"))
})


export {
    addQuestion,
    updateQuestionById,
    deleteQuestionById,
    getAllQuestions,
    getPracticeQuestions
}

