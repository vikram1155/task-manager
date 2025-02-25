import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomTextField from "./CustomTextField";
import CustomSelect from "./CustomSelect";
import { priorityOptions, statusOptions, taskTypeOptions } from "../data/data";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { colorSchemes } from "../data/theme";
import { getAllTeamFromApi, getAllUsersFromApi } from "../utils/api";
import { setTeamMembers } from "../redux/teamMembersSlice";

const TaskForm = ({
  formData,
  handleFormChange,
  handleFormChangeType,
  handleDateChange,
}) => {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    const getAllTeamMembersFn = async () => {
      try {
        const getAllTeamMembers = await getAllTeamFromApi();
        dispatch(setTeamMembers(getAllTeamMembers));
      } catch (error) {
        console.error("Error gettings tasks:", error);
      }
    };
    // All users
    const getAllUsersFromApiFn = async () => {
      try {
        const response = await getAllUsersFromApi();
        setAllUsers(response);
      } catch (error) {
        console.error("Error gettings users:", error);
      }
    };
    getAllTeamMembersFn();
    getAllUsersFromApiFn();
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pt: 2,
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
          // onChange={handleFormChange}
          required
          disabled
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
        {allUsers?.length && (
          <CustomSelect
            label="Assign To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleFormChangeType}
            options={allUsers?.map((user) => user.email)}
          />
        )}
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
        <CustomSelect
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleFormChangeType}
          options={priorityOptions}
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            width: "40%",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              value={formData.deadline ? dayjs(formData.deadline) : null}
              onChange={(newValue) => handleDateChange("deadline", newValue)}
              sx={{
                "&.MuiFormControl-root": {
                  width: "100%",
                  backgroundColor: colorSchemes.darkBg,
                  color: colorSchemes.whiteText,
                  borderRadius: "4px",
                },
                "& .MuiInputLabel-root": {
                  color: colorSchemes.whiteText,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: colorSchemes.whiteText,
                },
                "& .MuiOutlinedInput-input": {
                  color: colorSchemes.whiteText,
                },
                "& .MuiSvgIcon-root": {
                  color: colorSchemes.whiteText,
                },
              }}
            />
          </LocalizationProvider>
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
