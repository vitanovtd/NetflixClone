import { createAsyncThunk } from "@reduxjs/toolkit";

const swapiBaseUrl = "https://swapi.dev/api";
const baseUrl = "http://localhost:5000/api";

const getMovies = createAsyncThunk(
  "home/getMovies",
  async (payload, { signal }) => {
    const url = `${swapiBaseUrl}/people`;
    let response = null;
    let responseData = null;
    try {
      response = await fetch(url, {
        method: "GET",
        signal: signal,
      });
      responseData = await response.json();
      return responseData.results;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const getMoviesByGenre = createAsyncThunk(
  "movies/getMoviesByGenre",
  async ({ genre, field }, { signal }) => {
    const response = await fetch(`${baseUrl}/movies/movies-by-genre/${genre}`, {
      signal,
    });
    if (signal.aborted) {
      return;
    }
    const movies = await response.json();
    return { field, movies };
  }
);

const getMoviesByTitle = createAsyncThunk(
  "movies/getMovieByTitle",
  async (title, { signal }) => {
    const response = await fetch(`${baseUrl}/movies/movies-by-title/${title}`, {
      signal,
    });
    if (signal.aborted) {
      return;
    }
    const data = await response.json();
    return data;
  }
);

export { getMovies, getMoviesByGenre, getMoviesByTitle };
