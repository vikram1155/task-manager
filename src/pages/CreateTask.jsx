import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";
import { createTaskApi } from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { colorSchemes } from "../data/theme";

function CreateTask() {
  const [createTaskForm, setCreateTaskForm] = useState({
    title: "",
    assignee: JSON.parse(localStorage.getItem("userinfo")).email,
    type: "",
    assignedTo: "",
    status: "",
    storyPoints: "",
    description: "",
    comments: "",
    priority: "",
    teamAssigned: "",
    deadline: null,
  });

  const handleCreateTaskFormChange = (e) => {
    const { name, value } = e.target;
    setCreateTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTaskFormChangeType = (e, name) => {
    setCreateTaskForm((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleDateChange = (name, value) => {
    setCreateTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = async () => {
    const createTaskFormModified = {
      ...createTaskForm,
      taskId: uuidv4(),
      assignedOn: new Date().toISOString(),
    };
    try {
      const newTask = await createTaskApi(createTaskFormModified);
      if (newTask?.status?.code === 200) {
        dispatch(addTask(createTaskFormModified));
      }
      navigate("/manage-tasks");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDiscard = () => {
    setCreateTaskForm({
      title: "",
      assignee: "",
      assignedTo: "",
      status: "",
      description: "",
      comments: "",
    });
  };

  return (
    <Box>
      <CustomHeader value="Create New Tasks" />
      <TaskForm
        formData={createTaskForm}
        handleFormChange={handleCreateTaskFormChange}
        handleFormChangeType={handleCreateTaskFormChangeType}
        handleDateChange={handleDateChange}
        handleDiscard={handleDiscard}
        handleSave={handleSave}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          position: "fixed",
          bottom: "0",
          width: "calc(100% - 97px)",
          background: "#fff",
          left: "56px",
          padding: "20px",
          backgroundColor: colorSchemes.blackBg,
          zIndex: 1,
        }}
      >
        <CustomButton
          variant="outlined"
          color="default"
          onClickFunction={handleDiscard}
          title="Discard"
          sx={{ backgroundColor: colorSchemes.whiteBg }}
        />
        <CustomButton
          variant="contained"
          color="default"
          onClickFunction={handleSave}
          title="Save"
          sx={{ backgroundColor: colorSchemes.buttonBg }}
        />
      </Box>
    </Box>
  );
}

export default CreateTask;
