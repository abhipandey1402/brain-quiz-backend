import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addQuestion, deleteQuestionById, getAllQuestions, getPracticeQuestions, updateQuestionById } from "../controllers/question.controller.js";

const router = Router();

router.route('/addQuestion').post(verifyJWT, addQuestion);
router.route('/updateQuestion').patch(verifyJWT, updateQuestionById);
router.route('/deleteQuestion').delete(verifyJWT, deleteQuestionById);
router.route('/getAllQuestions').get(verifyJWT, getAllQuestions);
router.route('/getPracticeQuestions').get(verifyJWT, getPracticeQuestions);


export default router;