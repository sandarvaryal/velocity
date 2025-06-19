import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  admin: false,
};

const isAdmin = createSlice({
  name: "isAdmin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<any>) => {
      state.admin = action.payload;
      //   state.selectedTodo = { data: action.payload };
    },
    clearAdmin: (state) => {
      state.admin = false;
    },
  },
});

export const { setAdmin, clearAdmin } = isAdmin.actions;
export default isAdmin.reducer;
