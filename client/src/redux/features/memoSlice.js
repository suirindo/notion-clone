import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    // reducer = 前の状態を新しい状態に更新するための裏側の仕組み
    setMemo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
