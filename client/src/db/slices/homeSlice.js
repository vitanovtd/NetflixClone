// Libs
import { createSlice } from "@reduxjs/toolkit";
import { getMovies } from "../../services/HomeService";

const initialState = {};

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovies.fulfilled, (state, action) => {
            // -> listening to promises from asyncThunk
        });
    }
});

export default homeSlice;
