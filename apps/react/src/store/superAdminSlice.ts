import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  superAdmin: false,
};

const isSuperAdminSlice = createSlice({
  name: "isSuperAdmin",
  initialState,
  reducers: {
    setIsSuperAdmin: (state, action: PayloadAction<any>) => {
      state.superAdmin = action.payload;
      //   state.selectedTodo = { data: action.payload };
    },
    clearIsSuperAdmin: (state) => {
      state.superAdmin = false;
    },
  },
});

export const { setIsSuperAdmin, clearIsSuperAdmin } = isSuperAdminSlice.actions;
export default isSuperAdminSlice.reducer;
