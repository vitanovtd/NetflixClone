import express from "express";
import { loginUser, registerUser } from "./modules/auth/authController.js";
import {
  getMoviesByGenre,
  getMovieByTitle,
} from "./modules/movies/moviesController.js";

const routerInstance = express.Router();

// Define routes
routerInstance.post("/api/auth/login", loginUser);
routerInstance.post("/api/auth/register", registerUser);
routerInstance.get("/api/movies/movies-by-genre/:genre", getMoviesByGenre);
routerInstance.get("/api/movies/movies-by-title/:title", getMovieByTitle);

export default routerInstance;
