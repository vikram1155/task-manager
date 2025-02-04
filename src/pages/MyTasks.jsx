import React from "react";
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
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomTableCell from "../components/CustomTableCell";

function MyTasks() {
  const myEmailId = localStorage.getItem("emailId") || "1markiv1155@gmail.com";

  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);
  const navigate = useNavigate();

  const myTasks = allTasksFromRedux.filter(
    (task) => task.assignedTo === myEmailId
  );

  return (
    <Box>
      My Tasks<br></br>
      <br></br>
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
                <TableCell component="th" scope="row">
                  {row.taskId}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
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
    </Box>
  );
}

export default MyTasks;
