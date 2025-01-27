import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function Notifications() {
  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);

  const currentDate = dayjs(); // Using Day.js for date handling
  const nearingDeadlineTasks = allTasksFromRedux.filter(
    (task) =>
      dayjs(task.deadline).isAfter(currentDate) &&
      dayjs(task.deadline).diff(currentDate, "hours") <= 24
  );
  const expiredTasks = allTasksFromRedux.filter((task) =>
    dayjs(task.deadline).isBefore(currentDate)
  );

  const navigate = useNavigate();

  return (
    <Box>
      {/* Upcoming Deadlines */}
      <Box>
        <Typography variant="body" fontWeight="bold">
          Upcoming Deadlines
        </Typography>
        <br></br>
        <br></br>
        {nearingDeadlineTasks.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "500px",
              overflow: "auto",
              border: "0.5px solid #ddd",
            }}
          >
            <Table aria-label="Tasks table" stickyHeader>
              <TableHead stickyHeader>
                <TableRow>
                  <TableCell sx={{ width: "5%", minWidth: "50px" }}>
                    Task ID
                  </TableCell>
                  <TableCell sx={{ width: "20%" }}>Title</TableCell>
                  <TableCell sx={{ width: "30%" }}>Description</TableCell>
                  <TableCell sx={{ width: "20%", minWidth: "50px" }}>
                    Assigned To
                  </TableCell>
                  <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                    Deadline
                  </TableCell>
                  <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ width: "15%", minWidth: "80px" }}>
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ width: "10%", minWidth: "50px" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nearingDeadlineTasks.map((row) => (
                  <TableRow
                    key={row.taskId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.taskId}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.assignedTo}</TableCell>
                    <TableCell>
                      {new Date(row.deadline).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => navigate(`/manage-tasks/${row.taskId}`)}
                      >
                        <OpenInNewIcon sx={{ fontSize: "14px" }} />
                      </IconButton>
                    </TableCell>
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

      {/* Urgent Deadlines */}
      <Box>
        <Typography variant="body" fontWeight="bold" mt={2}>
          Urgent Deadlines
        </Typography>
        <br></br>
        <br></br>
        {expiredTasks.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "500px",
              overflow: "auto",
              border: "0.5px solid #ddd",
            }}
          >
            <Table aria-label="Tasks table" stickyHeader>
              <TableHead stickyHeader>
                <TableRow>
                  <TableCell sx={{ width: "5%", minWidth: "50px" }}>
                    Task ID
                  </TableCell>
                  <TableCell sx={{ width: "20%" }}>Title</TableCell>
                  <TableCell sx={{ width: "30%" }}>Description</TableCell>
                  <TableCell sx={{ width: "20%", minWidth: "50px" }}>
                    Assigned To
                  </TableCell>
                  <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                    Deadline
                  </TableCell>
                  <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ width: "15%", minWidth: "80px" }}>
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ width: "10%", minWidth: "50px" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expiredTasks.map((row) => (
                  <TableRow
                    key={row.taskId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.taskId}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.assignedTo}</TableCell>
                    <TableCell>
                      {new Date(row.deadline).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => navigate(`/manage-tasks/${row.taskId}`)}
                      >
                        <OpenInNewIcon sx={{ fontSize: "14px" }} />
                      </IconButton>
                    </TableCell>
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
