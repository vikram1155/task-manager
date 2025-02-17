import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import TaskForm from "../components/TaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";
import { createTaskApi } from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { colorSchemes } from "../data/theme";
import { showSnackbar } from "../redux/snackbarSlice";

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
    deadline: null,
  });
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = Object.values(createTaskForm).every((value) => {
      return value !== "" && value !== null && value !== undefined;
    });

    const isDeadlineValid =
      createTaskForm.deadline &&
      !isNaN(new Date(createTaskForm.deadline)) &&
      new Date(createTaskForm.deadline) > new Date("2000-01-01");

    setCreateButtonDisabled(!(allFieldsFilled && isDeadlineValid));
  }, [createTaskForm]);

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
        dispatch(showSnackbar("Task Created Successfully!"));
        navigate("/manage-tasks");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDiscard = () => {
    setCreateTaskForm((prev) => ({
      ...prev,
      title: "",
      type: "",
      assignedTo: "",
      status: "",
      description: "",
      comments: "",
      priority: "",
      storyPoints: "",
      deadline: "",
    }));
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
        <Tooltip
          title={"Fill all the fields"}
          placement={"top"}
          disableInteractive
        >
          <span>
            <CustomButton
              variant="contained"
              color="default"
              onClickFunction={handleSave}
              title="Create"
              sx={{
                backgroundColor: colorSchemes.primaryGreen,
              }}
              disabled={createButtonDisabled}
            />
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default CreateTask;
