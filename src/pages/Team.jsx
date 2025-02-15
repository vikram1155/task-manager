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
import CustomLoader from "../components/CustomLoader";
import CustomError from "../components/CustomError";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { colorSchemes } from "../data/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
  backgroundColor: colorSchemes.blackBg,
};

function Team() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTeamMemberId, setselectedTeamMemberId] = useState("");
  const [modalFormData, setModalFormData] = useState({});
  const [errors, setErrors] = useState();
  const [apiState, setApiState] = useState({ loading: true, error: false });

  const dispatch = useDispatch();
  const teamMembersLocal = useSelector(
    (state) => state.teamMembers.teamMembers
  );

  useEffect(() => {
    const getAllTeamMembersFn = async () => {
      try {
        const getAllTeamMembers = await getAllTeamFromApi();
        dispatch(setTeamMembers(getAllTeamMembers));
        setApiState({ loading: false, error: false });
      } catch (error) {
        console.error("Error gettings tasks:", error);
        setApiState({ loading: false, error: true });
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

  const existingMembers = useSelector((state) => state.teamMembers.teamMembers);

  const validateForm = (data) => {
    let newErrors = {};

    // Email validation
    if (!data.mailId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mailId)) {
      newErrors.mailId = "Invalid email format";
    }

    // Phone number validation
    if (!data.phone || !/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Age validation (must be a number and greater than 0)
    if (!data.age || isNaN(data.age) || Number(data.age) <= 0) {
      newErrors.age = "Age must be a valid number";
    }

    // Check if email or phone already exists
    if (
      existingMembers?.some((member) => member.mailId === data.mailId) &&
      !isEditMode
    ) {
      newErrors.mailId = "Mail ID already exists!";
    }
    if (
      existingMembers?.some((member) => member.phone === data.phone) &&
      !isEditMode
    ) {
      newErrors.phone = "Phone number already exists!";
    }

    // Store all errors at once
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleCloseModal = () => {
    setModalFormData({});
    setOpenModal(false);
  };

  const handleSave = async () => {
    if (!validateForm(modalFormData)) return;
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
        <>
          {teamMembersLocal.length ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomHeader value="Team members" />
                <CustomButton
                  variant="contained"
                  color="default"
                  onClickFunction={handleOpenAddModal}
                  sx={{ backgroundColor: colorSchemes.buttonBg }}
                  title="Add New Member"
                />
              </Box>

              <Box py={4}>
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: "500px",
                    overflow: "auto",
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
                          <CustomTableCell value={row.name} type="tableBody" />
                          <CustomTableCell value={row.age} type="tableBody" />
                          <CustomTableCell
                            value={row.mailId}
                            type="tableBody"
                          />
                          <CustomTableCell value={row.phone} type="tableBody" />
                          <CustomTableCell value={row.role} type="tableBody" />
                          <CustomTableCell
                            value={row.remarks}
                            type="tableBody"
                          />
                          <CustomTableCell
                            value={
                              <ManageAccountsIcon
                                onClick={() => handleOpenEditModal(row)}
                                sx={{ cursor: "pointer" }}
                              />
                            }
                            type="tableBody"
                          />
                          {/* <TableCell>
                            <ManageAccountsIcon
                              onClick={() => handleOpenEditModal(row)}
                              sx={{ cursor: "pointer" }}
                            />
                          </TableCell> */}
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
                    <CustomHeader
                      value={
                        isEditMode ? "Edit Team Member" : "Add New Team Member"
                      }
                    />
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
                      {errors?.mailId && (
                        <Typography fontSize={"small"} color="error" pl={1.5}>
                          {errors.mailId}
                        </Typography>
                      )}
                      <CustomTextField
                        label="Phone Number"
                        name="phone"
                        value={modalFormData.phone || ""}
                        onChange={handleModalFormChanges}
                        disabled={isEditMode}
                      />
                      {errors?.phone && (
                        <Typography fontSize={"small"} color="error" pl={1.5}>
                          {errors.phone}
                        </Typography>
                      )}
                      <CustomTextField
                        label="Age"
                        name="age"
                        value={modalFormData.age || ""}
                        onChange={handleModalFormChanges}
                      />
                      {errors?.age && (
                        <Typography fontSize={"small"} color="error" pl={1.5}>
                          {errors.age}
                        </Typography>
                      )}
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
                        sx={{
                          display: "flex",
                          gap: "20px",
                          float: "right",
                          pt: 3,
                        }}
                      >
                        {isEditMode && (
                          <CustomButton
                            variant="contained"
                            color="default"
                            onClickFunction={handleRemoveMember}
                            title="Remove Member"
                          />
                        )}
                        <CustomButton
                          variant="outlined"
                          color="red"
                          onClickFunction={handleCloseModal}
                          title="Close"
                          sx={{ backgroundColor: colorSchemes.whiteBg }}
                        />
                        <CustomButton
                          variant="contained"
                          color="default"
                          onClickFunction={handleSave}
                          title={isEditMode ? "Save" : "Add Member"}
                          sx={{ backgroundColor: colorSchemes.buttonBg }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </>
          ) : (
            <>No Data found!</>
          )}
        </>
      )}
    </Box>
  );
}

export default Team;
