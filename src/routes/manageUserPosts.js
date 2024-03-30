import express from "express";
import { getProfileSummary, makePost, myPosts, renderUserPosts } from "../controllers/handleUserPosts.js";
import { uploadPosts } from "../middleware/usingMulter.js";
const router = express.Router();

router.post("/userPosts/addPost",uploadPosts.single('imageMedia'), makePost);
router.get("/userPosts/getPosts", renderUserPosts);
router.get("/userPosts/getMyPosts", myPosts);
router.get("/home/profileSummary", getProfileSummary);

export default router;