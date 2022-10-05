import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {} };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // reducer = 前の状態を新しい状態に更新するための裏側の仕組み
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
