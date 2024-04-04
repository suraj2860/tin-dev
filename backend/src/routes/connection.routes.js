import { Router } from "express";
import { sendRequest } from "../controllers/connection.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/send/:receiverId').post(verifyJWT, sendRequest);

export default router;