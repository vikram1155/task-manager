import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import teamReducer from "./teamMembersSlice.js";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    teamMembers: teamReducer,
  },
});

export default store;
