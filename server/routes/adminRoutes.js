import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { adminLogin, addStudent, getStudents, updateStudent } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/add", verifyToken, addStudent);
router.get("/list", verifyToken, getStudents);
router.put("/edit/:id", verifyToken, updateStudent);

export default router;
