import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Backdrop from "@mui/material/Backdrop";
import CustomTextField from "../components/CustomTextField";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamMembers as hardcodedTeamMembers } from "../data/Team"; // Update the path as needed
import {
  setTeamMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../redux/teamMembersSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

function Team() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTeamMemberMailId, setSelectedTeamMemberMailId] = useState("");
  const [modalFormData, setModalFormData] = useState({});

  const dispatch = useDispatch();
  const teamMembersLocal = useSelector(
    (state) => state.teamMembers.teamMembers
  );

  useEffect(() => {
    teamMembersLocal.length === 0 &&
      dispatch(setTeamMembers(hardcodedTeamMembers));
  }, [dispatch, teamMembersLocal.length]);

  const handleModalFormChanges = (e) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setModalFormData({});
    setOpenModal(false);
  };

  const handleSave = () => {
    if (isEditMode) {
      dispatch(updateMember(modalFormData));
    } else {
      dispatch(addMember(modalFormData));
    }
    handleCloseModal();
  };

  const handleOpenEditModal = (row) => {
    setIsEditMode(true);
    setSelectedTeamMemberMailId(row.mailId);
    setModalFormData(row);
    setOpenModal(true);
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setModalFormData({});
    setOpenModal(true);
  };

  const handleRemoveMember = () => {
    dispatch(deleteMember(selectedTeamMemberMailId));
    handleCloseModal();
  };

  return (
    <Box>
      {teamMembersLocal.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Team members</Typography>
            <Button variant="contained" onClick={handleOpenAddModal}>
              Add new member
            </Button>
          </Box>

          <Box py={4}>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "500px",
                overflow: "auto",
                border: "0.5px solid #ddd",
              }}
            >
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Mail ID</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembersLocal.map((row) => (
                    <TableRow key={row.mailId}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.mailId}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.remarks}</TableCell>
                      <TableCell>
                        <ManageAccountsIcon
                          onClick={() => handleOpenEditModal(row)}
                          sx={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
          >
            <Fade in={openModal}>
              <Box sx={style}>
                <Typography variant="body" component="h2">
                  {isEditMode ? "Edit Team Member" : "Add New Team Member"}
                </Typography>
                <Box>
                  <CustomTextField
                    label="Name"
                    name="name"
                    value={modalFormData.name || ""}
                    onChange={handleModalFormChanges}
                  />
                  <CustomTextField
                    label="Mail ID"
                    name="mailId"
                    value={modalFormData.mailId || ""}
                    onChange={handleModalFormChanges}
                    disabled={isEditMode}
                  />
                  <CustomTextField
                    label="Phone Number"
                    name="phone"
                    value={modalFormData.phone || ""}
                    onChange={handleModalFormChanges}
                  />
                  <CustomTextField
                    label="Age"
                    name="age"
                    value={modalFormData.age || ""}
                    onChange={handleModalFormChanges}
                  />
                  <CustomTextField
                    label="Role"
                    name="role"
                    value={modalFormData.role || ""}
                    onChange={handleModalFormChanges}
                  />
                  <CustomTextField
                    label="Remarks"
                    name="remarks"
                    value={modalFormData.remarks || ""}
                    onChange={handleModalFormChanges}
                    multiline
                    rows={3}
                  />

                  <Box
                    sx={{ display: "flex", gap: "20px", float: "right", pt: 3 }}
                  >
                    {isEditMode && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleRemoveMember}
                      >
                        Remove Member
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      {isEditMode ? "Save" : "Add Member"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </>
      ) : (
        <>Loading!</>
      )}
    </Box>
  );
}

export default Team;
