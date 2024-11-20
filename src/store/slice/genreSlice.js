import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {};

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action) => action.payload,
  },
});

export const { setGenre } = genreSlice.actions;
export default genreSlice.reducer;
