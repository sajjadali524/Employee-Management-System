import express from "express";
import attendanceController from "../controllers/attendance.controlle.js";
import { isAuthenticated, hasRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

export default router;