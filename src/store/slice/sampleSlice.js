import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    test: (state, action) => {
      // state.value = 100
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { test } = sampleSlice.actions

export default sampleSlice.reducer