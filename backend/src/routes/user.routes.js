import { Router } from "express";
import { changeCurrentPassword, getAllUsers, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateProfile, updateUserAvatar } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route('/').get(getAllUsers);
router.route('/login').post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post( verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route('/update').patch(verifyJWT, updateProfile);
router.route("/update-avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar);

export default router;