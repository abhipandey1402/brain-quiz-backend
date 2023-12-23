import { asyncHandler } from "../utils/asyncHandler.js";
import { Question } from "../models/question.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const addQuestion = asyncHandler(async (req, res) => {

    const reqData = req.body

    const questionPayload = {
        question: reqData.question,
        option: reqData.options,
        answer: reqData.answer,
        topic: reqData.topic,
        difficulty: reqData.difficulty,
        attemptedBy: ""
    }


})

const updateQuestionById = asyncHandler(async (req, res) => {

})

const deleteQuestionById = asyncHandler(async (req, res) => {

})

const getAllQuestions = asyncHandler(async (req, res) => {

})

const getPracticeQuestions = asyncHandler(async (req, res) => {

    const { topic, difficulty, numberOfQuestions } = req.params


})



export {
    addQuestion,
    updateQuestionById,
    deleteQuestionById,
    getAllQuestions,
    getPracticeQuestions
}

