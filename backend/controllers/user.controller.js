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
};

export default new userController();