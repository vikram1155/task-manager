import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allTasks } from "../data/Team";
import TaskForm from "../components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../redux/tasksSlice";

function ManageTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);
  const [manageTask, setManageTask] = useState(allTasksFromRedux[id - 1]);

  const handleCreateTaskFormChange = (e) => {
    const { name, value } = e.target;
    setManageTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTaskFormChangeType = (e, name) => {
    setManageTask((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const handleSave = () => {
    console.log("a-manageTask", manageTask);
    dispatch(updateTask(manageTask));
    console.log("a-allTasksFromRedux", allTasksFromRedux);
    navigate("/manage-tasks");
  };

  const handleDiscard = () => {
    dispatch(deleteTask(Number(id)));
    navigate("/manage-tasks");
  };

  return (
    <Box>
      Manage task - {id}
      <TaskForm
        formData={manageTask}
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
          Delete Task
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ textTransform: "none" }}
        >
          Update Task
        </Button>
      </Box>
    </Box>
  );
}

export default ManageTask;
