import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './slice/sampleSlice';
import gerneReducer from './slice/genreSlice';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    genre: gerneReducer,
  },
});
