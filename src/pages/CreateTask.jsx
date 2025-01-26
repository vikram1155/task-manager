import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = () => {
    dispatch(addTask(createTaskForm));
    navigate("/manage-tasks");
    console.log("Task Saved:", createTaskForm);
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
      <Typography>Create New Tasks!</Typography>

      <TaskForm
        formData={createTaskForm}
        handleFormChange={handleCreateTaskFormChange}
        handleFormChangeType={handleCreateTaskFormChangeType}
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
          width: "calc(100% - 40px)",
          background: "#fff",
          left: "0px",
          zIndex: 1200,
          padding: "20px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDiscard}
          sx={{ textTransform: "none" }}
        >
          Discard
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ textTransform: "none" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default CreateTask;
