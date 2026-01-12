import express from "express";
import userController from "../controllers/user.controller.js";
import { hasRole, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// public
router.post("/login", userController.login_user);
router.post("/logout", isAuthenticated, userController.logout_user);
router.patch("/change-password", isAuthenticated, userController.change_password);
router.get("/me", isAuthenticated, userController.get_profile);

// super admin
router.get("/get-all-org-with-users", isAuthenticated, hasRole("SUPER_ADMIN"), userController.get_all_org_with_users);

export default router;