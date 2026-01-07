import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

class userService {

    // login user
    async login_user (body) {
        try {
            if(!body.email || !body.password) {
                throw new Error("All fields are required!")
            };

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!regexEmail.test(body.email)) {
                throw new Error("Invalid email address!")
            };

            const user = await User.findOne({ userEmail: body.email}).select("+password");
            if(!user) {
                throw new Error("User did not exist!")
            };


            const comparePassword = await bcrypt.compare(body.password, user.password);
            if(!comparePassword) {
                throw new Error("Email or password is incorrect!")
            };

            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});

            return { token , user };

        } catch (error) {
            throw new Error(error.message)
        }
    };

    // change password
    async change_password (id, body) {
        try {
            if(!body.old_password || !body.password) {
                throw new Error("All fields are required!")
            };

            const user = await User.findById(id).select("+password");
            if(!user) {
                throw new Error("User not found!")
            };

            if(!user.mustChangePassword) {
                throw new Error("You did not change your password!")
            };

            const matchPassword = await bcrypt.compare(body.old_password, user.password);
            if(!matchPassword) {
                throw new Error("Old password is incorrect!")
            };

            if(body.old_password === body.password) {
                throw new Error("Password must be different from old password!")
            }
            
            const hashPassword = await bcrypt.hash(body.password, 10);
            user.password = hashPassword;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };
};

export default new userService();