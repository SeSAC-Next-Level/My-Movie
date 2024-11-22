import { createSlice, current } from '@reduxjs/toolkit';

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
const initialState = { isLogin: false };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // 유저 이름 받음
    login: (state, action) => {
      state.isLogin = true;
      return userInfo;
    },
    logout: (state, action) => {
      // username 확인해서 isLogin = false
      localStorage.setItem('isLogin', false);
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = usersSlice.actions;

export default usersSlice.reducer;
