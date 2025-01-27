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
import React, { useEffect, useState } from "react";
import {
  allTasks as allTasksHardCoded,
  statusOptions,
  taskTypeOptions,
  teamMembers,
} from "../data/Team";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllTasks } from "../redux/tasksSlice";
import CustomTextField from "../components/CustomTextField";
import CustomMultiSelect from "../components/CustomMultiSelect";

function ManageTasks() {
  const allTasksFromRedux = useSelector((state) => state.tasks.allTasks);
  const [manageTasksTableValues, setManageTasksTableValues] =
    useState(allTasksFromRedux);

  const dispatch = useDispatch();
  useEffect(() => {
    if (allTasksFromRedux.length === 0) {
      dispatch(setAllTasks(allTasksHardCoded));
    }
  }, [allTasksFromRedux.length, dispatch]);

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: [], // Now an array to handle multiple selections
    status: [], // Now an array to handle multiple selections
    assignedTo: [],
    searchValue: "",
  });

  useEffect(() => {
    const filteredValues = allTasksFromRedux.filter((task) => {
      const matchesSearchValue =
        task.taskId.toString().includes(filters.searchValue) ||
        task.title.toLowerCase().includes(filters.searchValue.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(filters.searchValue.toLowerCase());

      const matchesType =
        filters.type.length > 0 ? filters.type.includes(task.type) : true;

      const matchesStatus =
        filters.status.length > 0 ? filters.status.includes(task.status) : true;

      const matchesAssignedTo =
        filters.assignedTo.length > 0
          ? filters.assignedTo.includes(task.assignedTo)
          : true;

      return (
        matchesSearchValue && matchesType && matchesStatus && matchesAssignedTo
      );
    });

    setManageTasksTableValues(filteredValues);
  }, [filters, allTasksFromRedux]);

  const handleFilters = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const teamMembersNames = teamMembers.map((teamMember) => teamMember.mailId);

  return (
    <Box>
      Manage Tasks
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "70px 2fr 1fr",
          gap: "10px",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="body" fontWeight={700} mt={"3px"}>
          Filters:
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 30px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <CustomMultiSelect
            label="Task Type"
            name="type"
            value={filters.type}
            onChange={(e, name) => handleFilters(name, e.target.value)}
            options={taskTypeOptions}
          />
          <CustomMultiSelect
            label="Status"
            name="status"
            value={filters.status}
            onChange={(e, name) => handleFilters(name, e.target.value)}
            options={statusOptions}
          />
          <CustomMultiSelect
            label="Assigned To"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={(e, name) => handleFilters(name, e.target.value)}
            options={teamMembersNames}
          />
        </Box>
        <CustomTextField
          label="Search"
          name="search"
          placeholder="Search for ID, Title and Description"
          value={filters.searchValue}
          onChange={(e) => handleFilters("searchValue", e.target.value)}
        />
      </Box>
      {manageTasksTableValues.length ? (
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
                <TableCell sx={{ width: "15%", minWidth: "80px" }}>
                  Deadline
                </TableCell>
                <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                  Type
                </TableCell>
                <TableCell sx={{ width: "15%", minWidth: "80px" }}>
                  Status
                </TableCell>
                <TableCell sx={{ width: "10%", minWidth: "50px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {manageTasksTableValues.map((row) => (
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
        <Box>Loading...</Box>
      )}
    </Box>
  );
}

export default ManageTasks;
