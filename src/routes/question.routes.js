import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { addQuestion, deleteQuestionById, getAllQuestions, getPracticeQuestions, updateQuestionById } from "../controllers/question.controller.js";

const router = Router();

router.route('/addQuestion').post(verifyJWT, addQuestion);
router.route('/updateQuestion/:id').patch(verifyJWT, updateQuestionById);
router.route('/deleteQuestion/:id').delete(verifyJWT, deleteQuestionById);
router.route('/getAllQuestions').get(verifyJWT, getAllQuestions);
router.route('/getPracticeQuestions/:topic/:difficulty/:noOfQuestions').get(verifyJWT, getPracticeQuestions);


export default router;

