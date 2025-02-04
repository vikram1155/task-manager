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
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTeamMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../redux/teamMembersSlice";
import {
  createTeamMember,
  deleteMemberApi,
  getAllTeamFromApi,
  updateTeamMember,
} from "../utils/api";
import CustomTableCell from "../components/CustomTableCell";

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
  const [selectedTeamMemberId, setselectedTeamMemberId] = useState("");
  const [modalFormData, setModalFormData] = useState({});

  const dispatch = useDispatch();
  const teamMembersLocal = useSelector(
    (state) => state.teamMembers.teamMembers
  );

  useEffect(() => {
    const getAllTeamMembersFn = async () => {
      try {
        const getAllTeamMembers = await getAllTeamFromApi();
        dispatch(setTeamMembers(getAllTeamMembers));
      } catch (error) {
        console.error("Error gettings tasks:", error);
      }
    };
    getAllTeamMembersFn();
  }, [dispatch]);

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

  const handleSave = async () => {
    if (isEditMode) {
      try {
        const updateTeamMemberRes = await updateTeamMember(
          modalFormData.teamMemberId,
          modalFormData
        );
        if (updateTeamMemberRes?.status?.code === 200) {
          dispatch(updateMember(modalFormData));
        }
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      const newMemberWithId = {
        teamMemberId: uuidv4(),
        ...modalFormData,
      };
      try {
        const createTeamMemberRes = await createTeamMember(newMemberWithId);
        if (createTeamMemberRes?.status?.code === 200) {
          dispatch(addMember(newMemberWithId));
        }
      } catch (error) {
        console.error("Error creating member:", error);
      }
    }
    handleCloseModal();
  };

  const handleOpenEditModal = (row) => {
    setIsEditMode(true);
    setselectedTeamMemberId(row.teamMemberId);
    setModalFormData(row);
    setOpenModal(true);
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setModalFormData({});
    setOpenModal(true);
  };

  const handleRemoveMember = async () => {
    try {
      const deleteMemberRes = await deleteMemberApi(selectedTeamMemberId);
      if (deleteMemberRes?.status?.code === 200) {
        dispatch(deleteMember(selectedTeamMemberId));
      }
    } catch (error) {
      console.error("Error deleteing member:", error);
    }
    handleCloseModal();
  };

  // JSX
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
                    <CustomTableCell value="Name" />
                    <CustomTableCell value="Age" />
                    <CustomTableCell value="Mail ID" />
                    <CustomTableCell value="Phone" />
                    <CustomTableCell value="Role" />
                    <CustomTableCell value="Remarks" />
                    <CustomTableCell value="" />
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
