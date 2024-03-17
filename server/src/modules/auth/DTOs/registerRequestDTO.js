"use strict";

import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../../../shared/validations.js";

const RegisterRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [emailRegex, "Email must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
        match: [passwordRegex, "Password must be between 6 and 60 characters and may not contain a tilde (~)"]
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                const confirmPasswordIsMatched = this.get("password") === this.get("confirmPassword");
                return confirmPasswordIsMatched;
            },
            message: "Password and confirmPassword must match."
        }
    }
});

const RegisterRequestDTO = ({ email, password, confirmPassword }) => {
    const RegisterRequestDTO = new mongoose.Document({
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }, RegisterRequestSchema);

    return RegisterRequestDTO;
}

export default RegisterRequestDTO;
