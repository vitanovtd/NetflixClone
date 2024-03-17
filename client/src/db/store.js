import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import i18nSlice from "./slices/i18nSlice/i18nSlice";
import homeSlice from "./slices/homeSlice";
import localStorageMiddleware, { loadState } from "./middlewares/localStorageMiddleware";
import modalSlice from "./slices/modalSlice";
import movieSlice from "./slices/movieSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        i18n: i18nSlice.reducer,
        home: homeSlice.reducer,
        modal: modalSlice.reducer,
        movies: movieSlice.reducer
    },
    preloadedState: loadState(),
    middleware: (gDM) => gDM().concat(localStorageMiddleware)
});

export default store;
