import userService from "../services/user.service.js";

class userController {
    
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
};

export default new userController();