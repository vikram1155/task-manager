import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomTableCell from "../components/CustomTableCell";
import CustomHeader from "../components/CustomHeader";
import { getAllTasksFromApi } from "../utils/api";
import { setAllTasks } from "../redux/tasksSlice";
import { colorSchemes } from "../data/theme";

function MyTasks() {
  const myEmailId = localStorage.getItem("emailId") || "markiv1155@gmail.com";
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const getTasks = await getAllTasksFromApi();
        dispatch(setAllTasks(getTasks));
      } catch (error) {
        console.error("Error gettings tasks:", error);
      }
    };
    getAllTasks();
  }, [dispatch]);

  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);
  const navigate = useNavigate();

  const myTasks = allTasksFromRedux.filter(
    (task) => task.assignedTo === myEmailId
  );

  return (
    <Box>
      <CustomHeader value="My Tasks" />
      <br></br>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "500px",
          overflow: "auto",
          backgroundColor: colorSchemes.darkBg,
        }}
      >
        <Table aria-label="Tasks table" stickyHeader>
          <TableHead stickyHeader>
            <TableRow>
              <CustomTableCell
                sx={{ width: "5%", minWidth: "50px" }}
                value="Task ID"
              />
              <CustomTableCell sx={{ width: "20%" }} value="Title" />
              <CustomTableCell sx={{ width: "30%" }} value="Description" />
              <CustomTableCell
                sx={{ width: "10%", minWidth: "80px" }}
                value="Deadline"
              />
              <CustomTableCell
                sx={{ width: "10%", minWidth: "50px" }}
                value="Type"
              />
              <CustomTableCell
                sx={{ width: "15%", minWidth: "80px" }}
                value="Status"
              />
              <CustomTableCell
                sx={{ width: "10%", minWidth: "50px" }}
                value=""
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {myTasks.map((row) => (
              <TableRow
                key={row.taskId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CustomTableCell
                  value={row?.taskId?.slice(0, 8)}
                  type="tableBody"
                />
                <CustomTableCell value={row.title} type="tableBody" />
                <CustomTableCell value={row.description} type="tableBody" />
                <CustomTableCell
                  value={new Date(row.deadline).toLocaleDateString("en-GB")}
                  type="tableBody"
                />
                <CustomTableCell value={row.type} type="tableBody" />
                <CustomTableCell value={row.status} type="tableBody" />
                <CustomTableCell
                  value={
                    <IconButton
                      onClick={() => navigate(`/manage-tasks/${row.taskId}`)}
                    >
                      <OpenInNewIcon
                        sx={{
                          fontSize: "14px",
                          color: colorSchemes.whiteText,
                        }}
                      />
                    </IconButton>
                  }
                  type="tableBody"
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyTasks;
