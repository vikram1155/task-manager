import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import teamReducer from "./teamMembersSlice.js";
import snackbarReducer from "./snackbarSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    teamMembers: teamReducer,
    snackbar: snackbarReducer,
  },
});

export default store;
