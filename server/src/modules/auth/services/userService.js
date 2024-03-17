"use strict";

import UserModel from "../models/userModel.js";

const findUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        if (user === null) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error;
    }
}

export {
    findUserByEmail,
    getUserByEmail
}
