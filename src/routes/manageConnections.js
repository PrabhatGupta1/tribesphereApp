import express from "express";
import { acceptConnectionRequest, connectionCount, ignoreConnectionRequest, provideSuggestedConnections } from "../controllers/handleConnections.js";

const router = express.Router();

router.post("/acceptRequest", acceptConnectionRequest);
router.post("/ignoreRequest", ignoreConnectionRequest);
router.get("/api/suggestedConnections", provideSuggestedConnections);
router.get("/api/connectionCount", connectionCount);

export default router;