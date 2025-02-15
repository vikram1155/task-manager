import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setAllTasks, updateTask } from "../redux/tasksSlice";
import { deleteTaskApi, getAllTasksFromApi, updateTaskApi } from "../utils/api";
import CustomError from "../components/CustomError";
import CustomLoader from "../components/CustomLoader";
import CustomButton from "../components/CustomButton";
import { colorSchemes } from "../data/theme";
import CustomHeader from "../components/CustomHeader";

function ManageTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apiState, setApiState] = useState({ loading: true, error: false });

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const getTasks = await getAllTasksFromApi();
        dispatch(setAllTasks(getTasks));
        setApiState({ loading: false, error: false });
      } catch (error) {
        console.error("Error gettings tasks:", error);
        setApiState({ loading: false, error: true });
      }
    };
    getAllTasks();
  }, [dispatch]);

  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);
  const [manageTask, setManageTask] = useState(null);

  useEffect(() => {
    if (allTasksFromRedux.length) {
      const task = allTasksFromRedux.find((a) => a.taskId === id);
      setManageTask(task);
    }
  }, [allTasksFromRedux, id]);

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

  const handleDateChange = (name, value) => {
    setManageTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedTaskRes = await updateTaskApi(id, manageTask);
      if (updatedTaskRes?.status?.code === 200) {
        dispatch(updateTask(manageTask));
        navigate("/manage-tasks");
      }
    } catch (error) {
      console.error("Error gettings tasks:", error);
    }
  };

  const handleDiscard = async () => {
    try {
      const deleteTaskRes = await deleteTaskApi(id);
      if (deleteTaskRes?.status?.code === 200) {
        dispatch(deleteTask(id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    navigate("/manage-tasks");
  };

  return (
    <>
      {apiState.loading ? (
        <Box
          sx={{
            height: "calc(100vh - 100px)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomLoader />
        </Box>
      ) : apiState.error ? (
        <Box
          sx={{
            height: "calc(100vh - 150px)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomError />
        </Box>
      ) : (
        <Box>
          <CustomHeader value={`Manage - ${manageTask?.title}`} />
          {manageTask && (
            <TaskForm
              formData={manageTask}
              handleFormChange={handleCreateTaskFormChange}
              handleFormChangeType={handleCreateTaskFormChangeType}
              handleDateChange={handleDateChange}
              handleDiscard={handleDiscard}
              handleSave={handleSave}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              position: "fixed",
              bottom: "0",
              left: "0px",
              zIndex: 1200,
              padding: "20px",
              width: "calc(100vw - 95px)",
              marginLeft: "56px",
              backgroundColor: colorSchemes.blackBg,
            }}
          >
            <CustomButton
              variant="outlined"
              color="default"
              onClickFunction={handleDiscard}
              title="Delete Task"
              sx={{ backgroundColor: colorSchemes.whiteBg }}
            />
            <CustomButton
              variant="contained"
              color="default"
              onClickFunction={handleSave}
              title="Update Task"
              sx={{ backgroundColor: colorSchemes.primaryGreen }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default ManageTask;
