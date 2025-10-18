import express from "express";
import { verifyCertificate } from "../controllers/userController.js";

const router = express.Router();
router.get("/verify/:regNo", verifyCertificate);

export default router;
