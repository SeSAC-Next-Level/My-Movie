import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './slice/sampleSlice';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
});
