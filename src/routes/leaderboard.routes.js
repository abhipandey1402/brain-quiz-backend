import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getLeaderboard, refreshLeaderboard } from "../controllers/leaderboard.controller.js";

const router = Router();

router.route('/getLeaderboard').get(verifyJWT, getLeaderboard);
router.route('/refreshLeaderboard').patch(verifyJWT, refreshLeaderboard);

export default router;

