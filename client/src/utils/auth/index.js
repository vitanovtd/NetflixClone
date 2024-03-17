const emailRegex = /^(.+)@(.+)$/;
const passwordRegex = /^[^~]{6,60}$/;

const isEmailValid = (email) => {
    return emailRegex.test(email);
}

const isPasswordValid = (password) => {
    return passwordRegex.test(password);
}

export {
    isEmailValid,
    isPasswordValid
}
