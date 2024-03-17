import { createSlice } from '@reduxjs/toolkit';
import { getMoviesByGenre } from '../../services/HomeService.jsx';

const initialState = {
  trendingNow: [],
  topRated: [],
  actionMovies: [],
  comedyMovies: [],
  horrorMovies: [],
  romanceMovies: [],
  documentaries: [],
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesByGenre.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMoviesByGenre.fulfilled, (state, action) => {
      state.isLoading = false;
      state[action.payload.field] = action.payload.movies;
    });
    builder.addCase(getMoviesByGenre.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default movieSlice