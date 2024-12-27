import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice/usersSlice';
import gerneReducer from './slice/genreSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    genre: gerneReducer,
  },
});
