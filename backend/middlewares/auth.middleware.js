import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];

        if(!token) {
            return res.status(401).json({message: "Unauthorized user"})
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next();
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

export const hasRole = (...allowedRoles) => (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "You do not have permission to perform this action" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};