import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getTestResultById, getTestResultByStatus, saveTestResult } from "../controllers/test.controller.js";

const router = Router();

router.route('/saveTestResult').post(verifyJWT, saveTestResult)
router.route('/getTestResultsByStatus/:status').get(verifyJWT, getTestResultByStatus)
router.route('/getTestResultsById/:id').get(verifyJWT, getTestResultById)

export default router;

