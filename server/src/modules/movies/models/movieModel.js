"use strict";

import mongoose from "mongoose";


const MovieSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    adult: {
        type: Boolean,
        required: true,
    },
    backdrop_path: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    original_language: {
        type: String,
        required: true,
    },
    original_title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
    media_type: {
        type: String,
        required: true,
    },
    genre_ids: {
        type: [Number], // Array of Numbers
        required: true,
    },
    popularity: {
        type: Number,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    video: {
        type: Boolean,
        required: true,
    },
    vote_average: {
        type: Number,
        required: true,
    },
    vote_count: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
});

const MovieModel = mongoose.model("Movie", MovieSchema);

export default MovieModel;
