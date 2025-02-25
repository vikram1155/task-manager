import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamMembers: [],
};

const teamMembersSlice = createSlice({
  name: "teamMembers",
  initialState,
  reducers: {
    setTeamMembers(state, action) {
      state.teamMembers = action.payload;
    },
    addMember(state, action) {
      state.teamMembers.push(action.payload);
    },
    updateMember(state, action) {
      const index = state.teamMembers.findIndex(
        (member) => member.email === action.payload.email
      );
      if (index !== -1) {
        state.teamMembers[index] = action.payload;
      }
    },
    deleteMember(state, action) {
      state.teamMembers = state.teamMembers.filter(
        (member) => member.teamMemberId !== action.payload
      );
    },
  },
});

export const { setTeamMembers, addMember, updateMember, deleteMember } =
  teamMembersSlice.actions;

export default teamMembersSlice.reducer;
