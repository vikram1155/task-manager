import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  allTasks as allTasksHardCoded,
  statusOptions,
  taskTypeOptions,
} from "../data/Team";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllTasks } from "../redux/tasksSlice";
import CustomSelect from "../components/CustomSelect";

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
    type: "",
    status: "",
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

      const matchesType = filters.type ? task.type === filters.type : true;

      const matchesStatus = filters.status
        ? task.status === filters.status
        : true;

      return matchesSearchValue && matchesType && matchesStatus;
    });

    setManageTasksTableValues(filteredValues);
  }, [filters, allTasksFromRedux]);

  const handleFilters = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <Box>
      <h1>Manage Tasks!</h1>
      <Box>
        <h3>Filters:</h3>
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <TextField
            onChange={(e) => handleFilters("searchValue", e.target.value)}
            value={filters.searchValue}
            label="Search"
            variant="outlined"
          />
          <CustomSelect
            label="Task Type"
            name="type"
            value={filters.type}
            onChange={(e) => handleFilters("type", e.target.value)}
            options={taskTypeOptions}
          />
          <CustomSelect
            label="Status"
            name="status"
            value={filters.status}
            onChange={(e) => handleFilters("status", e.target.value)}
            options={statusOptions}
          />
        </Box>
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
                <TableCell sx={{ width: "40%" }}>Description</TableCell>
                <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                  Type
                </TableCell>
                <TableCell sx={{ width: "10%", minWidth: "50px" }}>
                  ETA
                </TableCell>
                <TableCell sx={{ width: "15%", minWidth: "100px" }}>
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
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.storyPoints}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/manage-tasks/${row.taskId}`)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        padding: "4px 12px 4px 8px",
                        textTransform: "none",
                        gap: "10px",
                      }}
                    >
                      <EditIcon sx={{ fontSize: "14px" }} />
                      Edit
                    </Button>
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
