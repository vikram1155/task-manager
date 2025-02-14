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
import { statusOptions, taskTypeOptions } from "../data/data";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllTasks } from "../redux/tasksSlice";
import CustomTextField from "../components/CustomTextField";
import CustomMultiSelect from "../components/CustomMultiSelect";
import { getAllTasksFromApi } from "../utils/api";
import CustomTableCell from "../components/CustomTableCell";
import CustomLoader from "../components/CustomLoader";
import CustomError from "../components/CustomError";

function ManageTasks() {
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
  const [manageTasksTableValues, setManageTasksTableValues] =
    useState(allTasksFromRedux);

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

  const existingMembers = useSelector((state) => state.teamMembers.teamMembers);
  const teamMembersNames = existingMembers.map(
    (teamMember) => teamMember.mailId
  );

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
        All Tasks
      </Typography>
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "10px",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 30px",
                gap: "20px",
                alignItems: "center",
                py: 2,
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
              // sx={{ m: 0 }}
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
                    <CustomTableCell
                      sx={{ width: "5%", minWidth: "50px" }}
                      value="Task ID"
                    />
                    <CustomTableCell sx={{ width: "20%" }} value="Title" />
                    <CustomTableCell
                      sx={{ width: "30%" }}
                      value="Description"
                    />
                    <CustomTableCell
                      sx={{ width: "20%", minWidth: "50px" }}
                      value="Assigned To"
                    />
                    <CustomTableCell
                      sx={{ width: "15%", minWidth: "80px" }}
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
                  {manageTasksTableValues.map((row) => (
                    <TableRow
                      key={row.taskId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.taskId?.slice(0, 8)}
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
                          onClick={() =>
                            navigate(`/manage-tasks/${row.taskId}`)
                          }
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
            <Box>No Data found!</Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ManageTasks;
