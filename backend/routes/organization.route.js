import express from "express";
import organizationController from "../controllers/organization.controller.js";
import { hasRole, isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create", isAuthenticated, hasRole("SUPER_ADMIN"), organizationController.create_organization);
router.get("/", isAuthenticated, hasRole("SUPER_ADMIN"), organizationController.get_all_organizations);
router.get("/:org_id", isAuthenticated, hasRole("SUPER_ADMIN"), organizationController.get_organization);
router.patch("/:org_id", isAuthenticated, hasRole("SUPER_ADMIN"), organizationController.update_organization);
router.patch("/status/:org_id", isAuthenticated, hasRole("SUPER_ADMIN"), organizationController.activate_deactivate_organization);
router.delete("/:org_id", isAuthenticated, hasRole("SUPER_ADMIN"), organizationController.delete_organization);

export default router;