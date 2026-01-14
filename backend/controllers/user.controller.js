import userService from "../services/user.service.js";

class userController {

    // =============================
    // PUBLIC API's START
    // =============================
    // login user
    async login_user (req, res) {
        try {
            const { email, password } = req.body;
            const {token, user} = await userService.login_user(req.body);
            return res.cookie("token", token, 
                {maxAge: 1 * 24 * 60 * 60 * 1000, secure: true, sameSite: "none", httpOnly:true})
                .status(200).json({
                message: `Welcome back ${user.userName}`,
            });
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // logout user
    async logout_user (req, res) {
        try {
            return res.cookie("token", " ", {maxAge: 0}).status(200).json({message: "User logout successfully!"});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // change password
    async change_password (req, res) {
        try {
            const id = req.user.id;
            const { old_password, password } = req.body;
            const change_password = await userService.change_password(id, req.body);
            return res.status(200).json({message: "Password is changed!", change_password});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // get logged in user profile
    async get_profile (req, res) {
        try {
            const user_id = req.user.id;
            const user = await userService.get_profile(user_id);
            return res.status(200).json({message: "user profile fetched", user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // ==========================
    // PUBLIC API's END
    // ==========================
    // --------------------------------------------
    // =============================
    // SUPER ADMIN API's START
    // =============================

    // get all organizations with user
    async get_all_org_with_users (req, res) {
        try {
            const organization = await userService.get_all_org_with_users();
            return res.status(200).json({message: "All organization fetched!", organization})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // get specific user
    async get_specific_user (req, res) {
        try {
            const user_id = req.params.id;
            const user = await userService.get_specific_user(user_id);
            return res.status(200).json({message: "User fetch successfully!", user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // activate/deactivate user
    async activate_deactivate_user (req, res) {
        try {
            const user_id = req.params.id;
            const { status } = req.body;
            const user = await userService.activate_deactivate_user(user_id, status);
            return res.status(200).json({message: "Status is updated!", user})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    };

    // delete specific user
    async delete_user (req, res) {
        try {
            const user_id = req.params.id;
            const user = await userService.delete_user(user_id);
            return res.status(200).json({message: "user is deleted!", user});
        } catch (error) {
            return res.status(500).json(error.message)
        }
    };

    // =============================
    // SUPER ADMIN API's END
    // =============================
    // -----------------------------------------------
    // =============================
    // ORG ADMIN API's START
    // =============================
    // create HR/Employee
    async create_hr_employee (req, res) {
        try {
            const user_id = req.user.id;
            const { userName, userEmail, password, role, designation } = req.body;
            const user = await userService.create_hr_employee(req.body, user_id);
            return res.status(201).json({message: `${role} is created successfully!`, user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // get org users list
    async get_org_users (req, res) {
        try {
            const user_id = req.user.id;
            const user = await userService.get_org_users(user_id);
            return res.status(200).json({message: "All users fetched!", user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // get specific org user
    async get_specific_org_user (req, res) {
        try {
            const user_id = req.user.id;
            const id = req.params.id;
            const user = await userService.get_specific_org_user(user_id, id);
            return res.status(200).json({message: "user are fetched!", user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // update organization user
    async update_org_user (req, res) {
        try {
            const user_id = req.user.id;
            const id = req.params.id;
            const { userName, userEmail, password, role, organization, mustChangePassword, designation } = req.body;
            const user = await userService.update_org_user(user_id, id, req.body);
            return res.status(200).json({ message: "user is updated!"}, user)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // update isActive
    async update_active_status (req, res) {
        try {
            const user_id = req.user.id;
            const id = req.params.id;
            const { status } = req.body;
            const user = await userService.update_active_status(user_id, id, status);
            return res.status(200).json({message: "user status is updated!", user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // delete org user
    async delete_org_user (req, res) {
        try {
            const user_id = req.user.id;
            const id = req.params.id;
            const user = await userService.delete_org_user(user_id, id);
            return res.status(200).json({message: "user is deleted!", user})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };
};

export default new userController();