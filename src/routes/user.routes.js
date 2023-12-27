import { Router } from "express";
import { changeCurrentPassword, getAtteptedTests, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route('/refreshToken').post(refreshAccessToken);
router.route('/changePassword').post(verifyJWT, changeCurrentPassword);
router.route('/currentUser').get(verifyJWT, getCurrentUser);
router.route('/attemptedTests').get(verifyJWT, getAtteptedTests);



export default router;

