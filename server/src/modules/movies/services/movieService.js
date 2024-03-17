import MovieModel from "../models/movieModel.js";

const findMovieByTitle = async (title) => {
    return await MovieModel.findOne({ title });
}

const findMoviesByGenre = async (genre) => {
    return await MovieModel.find({ genre });
}

export {
    findMoviesByGenre,
    findMovieByTitle
}