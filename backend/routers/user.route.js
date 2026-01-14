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
router.get("/user/:id", isAuthenticated, hasRole("SUPER_ADMIN"), userController.get_specific_user);
router.patch("/status/:id", isAuthenticated, hasRole("SUPER_ADMIN"), userController.activate_deactivate_user);
router.delete("/:id", isAuthenticated, hasRole("SUPER_ADMIN"), userController.delete_user);

// organization admin
router.post("/create-hr-employee", isAuthenticated, hasRole("ORG_ADMIN", "HR"), userController.create_hr_employee);
router.get("/list-users", isAuthenticated, hasRole("ORG_ADMIN", "HR"), userController.get_org_users);
router.get("/org-user/:id", isAuthenticated, hasRole("ORG_ADMIN", "HR"), userController.get_specific_org_user);
router.put("/update-user/:id", isAuthenticated, hasRole("ORG_ADMIN", "HR"), userController.update_org_user);
router.patch("/update-user-status/:id", isAuthenticated, hasRole("ORG_ADMIN", "HR"), userController.update_active_status);
router.delete("/delete/:id", isAuthenticated, hasRole("ORG_ADMIN"), userController.delete_org_user);

export default router;