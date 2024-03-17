import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  currentMovie: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
  },
});

export const { openModal, closeModal, setCurrentMovie } = modalSlice.actions;
export default modalSlice;