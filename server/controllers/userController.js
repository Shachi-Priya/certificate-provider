import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Admin login (static for demo)
export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
};

// Add new student
export const addStudent = async (req, res) => {
  try {
    const payload = {
      regNo: req.body.regNo,
      studentName: req.body.studentName,
      course: req.body.course,
      issuedOn: req.body.issuedOn ? new Date(req.body.issuedOn) : new Date(), 
      certificateUrl: req.body.certificateUrl, // optional
    };
    const user = await User.create(payload);
    return res.status(201).json(user); // return created doc
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  const students = await User.find();
  res.json(students);
};

// Edit student
export const updateStudent = async (req, res) => {
  try {
    const update = {
      regNo: req.body.regNo,
      studentName: req.body.studentName,
      course: req.body.course,
    };
    if (req.body.issuedOn) update.issuedOn = new Date(req.body.issuedOn);
    if (req.body.certificateUrl !== undefined) update.certificateUrl = req.body.certificateUrl;

    const student = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Verify certificate
export const verifyCertificate = async (req, res) => {
  const { regNo } = req.params;
  const student = await User.findOne({ regNo });
  if (!student) return res.status(404).json({ message: "No certificate available" });
  res.json(student);
};
