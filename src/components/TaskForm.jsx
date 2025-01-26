import React from "react";
import { Box } from "@mui/material";
import CustomTextField from "./CustomTextField";
import CustomSelect from "./CustomSelect";
import {
  priorityOptions,
  statusOptions,
  taskTypeOptions,
  teamMembers,
  teamTypesOptions,
} from "../data/Team";

const TaskForm = ({ formData, handleFormChange, handleFormChangeType }) => {
  const teamMembersNames = teamMembers.map((teamMember) => teamMember.mailId);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pt: 3,
        borderRadius: "8px",
        width: "100%",
      }}
    >
      {/* Row 1 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <CustomTextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required
        />
        <CustomSelect
          label="Task Type"
          name="type"
          value={formData.type}
          onChange={handleFormChangeType}
          options={taskTypeOptions}
        />
        <CustomTextField
          label="Assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleFormChange}
          required
        />
      </Box>

      {/* Row 2 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <CustomSelect
          label="Assign To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleFormChangeType}
          options={teamMembersNames}
        />
        <CustomSelect
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleFormChangeType}
          options={statusOptions}
        />
        <CustomTextField
          label="Story Points"
          name="storyPoints"
          value={formData.storyPoints}
          onChange={handleFormChange}
          required
        />
      </Box>

      {/* Row 3 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomTextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          multiline
          rows={4}
          required
          sx={{ width: "60%" }}
        />
        <Box
          sx={{
            width: "calc(40% - 24px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <CustomSelect
            label="Team Assigned"
            name="teamAssigned"
            value={formData.teamAssigned}
            onChange={handleFormChangeType}
            options={teamTypesOptions}
          />
          <CustomSelect
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleFormChangeType}
            options={priorityOptions}
          />
        </Box>
      </Box>

      {/* Comments */}
      <CustomTextField
        label="Comments"
        name="comments"
        value={formData.comments}
        onChange={handleFormChange}
        multiline
        rows={3}
      />
    </Box>
  );
};

export default TaskForm;
