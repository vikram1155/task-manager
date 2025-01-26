import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { allTasks } from "../data/Team";

function PendingTasks() {
  const pendingTasks = allTasks.filter(
    (allTask) => allTask.status === "To Be Picked"
  );

  return (
    <Box>
      <Typography>Pending Tasks</Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "500px",
          overflow: "auto",
          border: "0.5px solid #ddd",
        }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell sx={{ width: "5%", minWidth: "50px" }}>
                Task ID
              </TableCell>
              <TableCell sx={{ width: "20%" }}>Title</TableCell>
              <TableCell sx={{ width: "40%" }}>Description</TableCell>
              <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                Type
              </TableCell>
              <TableCell sx={{ width: "10%", minWidth: "50px" }}>ETA</TableCell>
              <TableCell sx={{ width: "15%", minWidth: "100px" }}>
                Status
              </TableCell>
              <TableCell sx={{ width: "10%", minWidth: "50px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTasks.map((row) => (
              <TableRow
                key={row.taskId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.taskId}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.storyPoints}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PendingTasks;
