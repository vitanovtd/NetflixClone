// Libs
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    user: {
        email: "",
        token: null,
        isLoggedIn: false
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            const { email, token } = action.payload;
            state.user.email = email;
            state.user.token = token;
            state.user.isLoggedIn = true;
        },
        userLoggedOut: (state) => {
            state.user.email = "";
            state.user.token = null;
            state.user.isLoggedIn = false;
            localStorage.clear("NetflixClone");
        }
    }
});

const { userLoggedIn, userLoggedOut } = authSlice.actions;

const useSelectUser = () => {
    const user = useSelector(state => state.auth.user);
    return user;
}

export default authSlice;
export {
    userLoggedIn,
    userLoggedOut,
    useSelectUser
}
