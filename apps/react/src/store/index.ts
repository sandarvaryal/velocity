import { configureStore } from "@reduxjs/toolkit";
import isSuperAdminReducer from "./superAdminSlice";
import isAdminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    isSuperAdmin: isSuperAdminReducer,
    isAdmin: isAdminReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
