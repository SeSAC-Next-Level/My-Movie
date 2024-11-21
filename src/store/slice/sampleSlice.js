import { createSlice } from '@reduxjs/toolkit';

/* 
[
  {
    name1 : ['영화아이디1', '영화아이디2'],
    isLogin : true
  },
  {
    name2 : ['영화아이디3', '영화아이디4'],
    isLogin : false
  }
]
*/
const initialState = {};

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username } = action.payload.username;
      console.log(username);

      const userInfo = { [`${username}`]: [], inLogin: true };
      if (!state.some((user) => username in user))
        return {
          ...state,
          userInfo,
        };
    },
    logout: (state, action) => {
      // username 확인해서 삭제
      const { username } = action.payload;
      console.log(username);
    },
  },
});

// Action creators are generated for each case reducer function
export const { test } = sampleSlice.actions;

export default sampleSlice.reducer;
