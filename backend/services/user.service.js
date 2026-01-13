import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";

class userService {

    // =============================
    // PUBLIC API's START
    // =============================
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

            const user = await User.findOne({ userEmail: body.email} || {email: body.email}).select("+password");
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

    // get logged in user profile
    async get_profile (user_id) {
        try {
            const user = await User.findById(user_id);
            if(!user) {
                throw new Error("User not found!")
            };

            return user;
        } catch (error) {
            throw new Error(error.message)
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
    async get_all_org_with_users () {
        try {
            const organization = await Organization.find().populate({
                path: "users",
                select: "userName userEmail role isActive"
            });
            if(!organization || organization.length === 0) {
                throw new Error("No organization exist!")
            };

            return organization;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // get specific user
    async get_specific_user (user_id) {
        try {
            const user = await User.findById(user_id);
            if(!user) {
                throw new Error("User not exist!")
            };

            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // activate deactivate user
    async activate_deactivate_user (user_id, status) {
        try {
            const user = await User.findByIdAndUpdate(user_id, {isActive: status}, {new: true});
            if(!user) {
                throw new Error("User not found!")
            };
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // delete user
    async delete_user (user_id) {
        try {
            const user = await User.findByIdAndDelete(user_id);
            if(!user) {
                throw new Error("user not exist!")
            };
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // =============================
    // SUPER ADMIN API's END
    // =============================
    // -----------------------------------------------
    // =============================
    // SUPER ADMIN API's START
    // =============================
    // create HR/Employee
    async create_hr_employee (body, user_id) {
        try {
            const logged_in_user = await User.findById(user_id).populate("organization");

            let emailQuery = {userEmail: body.userEmail};
            if(logged_in_user.role === "ORG_ADMIN") {
                emailQuery.organization = logged_in_user.organization._id
            }
            const existing_user = await User.findOne(emailQuery);
            if(existing_user) {
                throw new Error("User already exist with this email!")
            };

            const hashPassword = await bcrypt.hash(body.password, 10);

            const user = await User.create({
                userName: body.userName,
                userEmail: body.userEmail,
                password: hashPassword,
                role: body.role,
                organization: logged_in_user.organization._id
            });

            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // get org users list
    async get_org_users (user_id) {
        try {
            const logged_in_user = await User.findById(user_id).populate("organization");
            const user = await User.find({organization: logged_in_user.organization._id});
            if(!user || user.length < 1) {
                throw new Error("No users exist in this oragnization!")
            };

            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // get specific org user
    async get_specific_org_user (user_id, id) {
        try {
            const logged_in_user = await User.findById(user_id).populate("organization");
            let query = {_id: id};
            if(logged_in_user.role === "ORG_ADMIN") {
                query.organization = logged_in_user.organization._id
            }
            const user = await User.findOne(query);
            if(!user) {
                throw new Error("user not found!")
            };
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    };
};

export default new userService();