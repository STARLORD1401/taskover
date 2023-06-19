import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/task/tasksSlice.js";
import userReducer from "../features/user/userSlice.js";
import navbarReducer from "../features/navbar/navbarSlice.js";
import toastReducer from "../features/toast/toastSlice.js";
import tabReducer from "../features/tab/tabSlice.js";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
    navbar: navbarReducer,
    toast: toastReducer,
    tab: tabReducer,
  },
});
export default store;
