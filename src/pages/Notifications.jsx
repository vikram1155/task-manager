import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomTableCell from "../components/CustomTableCell";
import { getAllTasksFromApi } from "../utils/api";
import { setAllTasks } from "../redux/tasksSlice";
import { colorSchemes } from "../data/theme";
import CustomHeader from "../components/CustomHeader";

function Notifications() {
  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentDate = dayjs(); // Using Day.js for date handling
  const nearingDeadlineTasks = allTasksFromRedux.filter(
    (task) =>
      dayjs(task.deadline).isAfter(currentDate) &&
      dayjs(task.deadline).diff(currentDate, "hours") <= 24
  );
  const expiredTasks = allTasksFromRedux.filter((task) =>
    dayjs(task.deadline).isBefore(currentDate)
  );

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

  return (
    <Box>
      {/* Upcoming Deadlines */}
      <Box>
        <CustomHeader value="Upcoming Deadlines" />
        <br></br>
        <br></br>
        {nearingDeadlineTasks.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "500px",
              overflow: "auto",
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
                    sx={{ width: "20%", minWidth: "50px" }}
                    value="Assigned To"
                  />
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
                {nearingDeadlineTasks.map((row) => (
                  <TableRow
                    key={row.taskId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <CustomTableCell
                      value={row?.taskId?.slice(0, 8)}
                      type="tableBody"
                    />
                    <CustomTableCell type="tableBody" value={row?.title} />
                    <CustomTableCell
                      type="tableBody"
                      value={row?.description}
                    />
                    <CustomTableCell type="tableBody" value={row?.assignedTo} />
                    <CustomTableCell
                      type="tableBody"
                      value={new Date(row.deadline).toLocaleDateString("en-GB")}
                    />
                    <CustomTableCell type="tableBody" value={row?.deadline} />
                    <CustomTableCell type="tableBody" value={row?.status} />
                    <CustomTableCell
                      type="tableBody"
                      value={
                        <IconButton
                          onClick={() =>
                            navigate(`/manage-tasks/${row.taskId}`)
                          }
                        >
                          <OpenInNewIcon
                            sx={{
                              fontSize: "14px",
                              color: colorSchemes.whiteText,
                            }}
                          />
                        </IconButton>
                      }
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No upcoming deadlines within 24 hours.</Typography>
        )}
      </Box>

      <br></br>

      {/* Overdue Tasks */}
      <Box>
        <br></br>
        <br></br>
        <CustomHeader value="Overdue Tasks" />
        <br></br>
        <br></br>
        {expiredTasks.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "500px",
              overflow: "auto",
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
                    sx={{ width: "20%", minWidth: "50px" }}
                    value="Assigned To"
                  />
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
                {expiredTasks.map((row) => (
                  <TableRow
                    key={row.taskId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <CustomTableCell
                      value={row?.taskId?.slice(0, 8)}
                      type="tableBody"
                    />
                    <CustomTableCell value={row?.title} type="tableBody" />
                    <CustomTableCell
                      value={row?.description}
                      type="tableBody"
                    />
                    <CustomTableCell value={row?.assignedTo} type="tableBody" />
                    <CustomTableCell
                      value={new Date(row.deadline).toLocaleDateString("en-GB")}
                      type="tableBody"
                    />
                    <CustomTableCell value={row?.type} type="tableBody" />
                    <CustomTableCell value={row?.status} type="tableBody" />
                    <CustomTableCell
                      value={
                        <IconButton
                          onClick={() =>
                            navigate(`/manage-tasks/${row.taskId}`)
                          }
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
        ) : (
          <Typography>No overdue tasks.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Notifications;
