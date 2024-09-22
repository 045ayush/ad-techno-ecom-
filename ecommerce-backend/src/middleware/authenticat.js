const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = (requiredRoles = []) => {
    return async (req, res, next) => {
        try {
            
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).send({ message: "Token not found" });
            }

            const userId = jwtProvider.getUserIdFromToken(token);
            if (!userId) {
                return res.status(401).send({ message: "Invalid token" });
            }

            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            req.user = user;

            if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
                return res.status(403).send({ message: "Access denied" });
            }
            
            next();
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    };
};

module.exports = authenticate;
