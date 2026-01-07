import express from "express";
import userController from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// public
router.post("/login", userController.login_user);
router.post("/logout", isAuthenticated, userController.logout_user);
router.patch("/change-password", isAuthenticated, userController.change_password);

export default router;