import express from "express";
import { renderProfile } from "../controllers/userProfile.js";
import {editProfile, addNewHobbyOrInterest, addUserGoals, changeProfileCover, changeProfilePicture} from "../controllers/updateProfileController.js";
import { upload } from "../middleware/usingMulter.js";

const router = express.Router();

router.get("/profile", renderProfile);
router.post("/edit-profile", editProfile);
router.post("/add-new", addNewHobbyOrInterest);
router.post("/add-new-goal", addUserGoals);
router.post('/upload-profile-pic',upload.single('profile-pic'), changeProfilePicture);
router.post('/upload-profile-cover',upload.single('profile-cover'), changeProfileCover);

export default router;