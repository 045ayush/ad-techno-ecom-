const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../prisma/client'); // Assuming you have a prismaClient.js file exporting PrismaClient instance
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password, role } = userData;

        // Check if user already exists
        const isUserExist = await prisma.user.findUnique({
            where: { email },
        });

        if (isUserExist) {
            throw new Error(`User already exists with email: ${email}`);
        }

        // Hash the password
        password = await bcrypt.hash(password, 8);

        // Create the user
        const user = await prisma.user.create({
            data: { firstName, lastName, email, password, role },
        });

        console.log("User created:", user);

        return user;

    } catch (error) {
        console.log("Error:", error.message);
        throw new Error(error.message);
    }
}

const getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { addresses: true }, // Assuming you have an addresses relation
        });

        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }

        return user;
    } catch (error) {
        console.log("Error:", error.message);
        throw new Error(error.message);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }

        return user;
    } catch (error) {
        console.log("Error:", error.message);
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);

        console.log("User ID from token:", userId);

        const user = await getUserById(userId);

        if (!user) {
            throw new Error(`User does not exist with id: ${userId}`);
        }

        // Remove password from the response
        user.password = null;

        return user;
    } catch (error) {
        console.log("Error:", error.message);
        throw new Error(error.message);
    }
}

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            include: { addresses: true },
        });
        return users;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
}

module.exports = {
    createUser,
    getUserProfileByToken,
    getUserByEmail,
    getAllUsers,
    getUserById
}
