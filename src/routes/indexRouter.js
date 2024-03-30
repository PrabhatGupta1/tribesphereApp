import express from "express";
import { registerUser, authenticateUser, loginUser, logoutUser} from "../controllers/signupAndLogin.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", authenticateUser, loginUser);
router.get("/logout", logoutUser);

export default router;