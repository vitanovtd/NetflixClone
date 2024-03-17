"use strict";

import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../../../shared/validations.js";

const LoginRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [emailRegex, "Email must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
        match: [passwordRegex, "Password must be between 6 and 60 characters and may not contain a tilde (~)"]
    }
});

const LoginRequestDTO = ({ email, password }) => {
    const LoginRequestDTO = new mongoose.Document({
        email: email,
        password: password
    }, LoginRequestSchema);

    return LoginRequestDTO;
}

export default LoginRequestDTO;
