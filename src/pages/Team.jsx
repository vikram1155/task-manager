import { Box, Fade, Modal, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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
  getAllUsersFromApi,
  updateTeamMember,
} from "../utils/api";
import CustomTableCell from "../components/CustomTableCell";
import CustomLoader from "../components/CustomLoader";
import CustomError from "../components/CustomError";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { colorSchemes } from "../data/theme";
import CustomSelect from "../components/CustomSelect";
import { showSnackbar } from "../redux/snackbarSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 280, md: 400 },
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
  const [apiState, setApiState] = useState({ loading: true, error: false });
  const [allUsers, setAllUsers] = useState();
  const dispatch = useDispatch();
  const teamMembersLocal = useSelector(
    (state) => state.teamMembers.teamMembers
  );

  // API calls
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
    const getAllUsersFromApiFn = async () => {
      try {
        const response = await getAllUsersFromApi();
        setAllUsers(response);
      } catch (error) {
        console.error("Error gettings users:", error);
      }
    };
    getAllTeamMembersFn();
    getAllUsersFromApiFn();
  }, [dispatch]);

  // Modal
  // Close Modal
  const handleCloseModal = () => {
    setModalFormData({});
    setOpenModal(false);
  };
  // Edit Modal
  const handleOpenEditModal = (row) => {
    setIsEditMode(true);
    setselectedTeamMemberId(row.teamMemberId);
    setModalFormData(
      teamMembersLocal.filter((a) => a.teamMemberId === row.teamMemberId)[0]
    );
    setOpenModal(true);
  };
  // Open Modal
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setOpenModal(true);
  };

  // Functions
  const handleSave = async () => {
    if (isEditMode) {
      try {
        const updateTeamMemberRes = await updateTeamMember(
          modalFormData.teamMemberId,
          modalFormData
        );
        if (updateTeamMemberRes?.status?.code === 200) {
          dispatch(updateMember(modalFormData));
          dispatch(showSnackbar("Updated Successfully!"));
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
          dispatch(showSnackbar("Member Added Successfully!"));
        }
      } catch (error) {
        console.error("Error creating member:", error);
      }
    }
    handleCloseModal();
  };

  const handleRemoveMember = async () => {
    try {
      const deleteMemberRes = await deleteMemberApi(selectedTeamMemberId);
      if (deleteMemberRes?.status?.code === 200) {
        dispatch(deleteMember(selectedTeamMemberId));
        dispatch(showSnackbar("Removed Member Successfully!"));
      }
    } catch (error) {
      console.error("Error deleteing member:", error);
    }
    handleCloseModal();
  };

  // Users DB
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    setSelectedUser(
      allUsers?.filter((user) => user.email === modalFormData.email)[0]
    );
  }, [allUsers, modalFormData.email]);

  useEffect(() => {
    !isEditMode &&
      setModalFormData((prev) => ({
        ...prev,
        access: "",
        remarks: "",
        age: selectedUser?.age,
        email: selectedUser?.email,
        name: selectedUser?.name,
        role: selectedUser?.role,
        phone: selectedUser?.phone,
      }));
  }, [selectedUser, isEditMode]);

  const handleInputChange = (name) => (e) => {
    setModalFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const fields = isEditMode
    ? ["name", "email", "phone", "age", "role"]
    : ["name", "phone", "age", "role"];

  const renderFields = () =>
    fields.map((field) => (
      <CustomTextField
        key={field}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        name={field}
        value={modalFormData?.[field] || ""}
        disabled
      />
    ));

  const availableUsersOptions = allUsers
    ?.filter(
      (user) => !teamMembersLocal?.some((member) => member.email === user.email)
    )
    .map((user) => user.email);

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const activeUser = teamMembersLocal.find(
    (member) => member.email === userInfo?.email
  );

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
                <Tooltip
                  title={
                    activeUser?.access !== "Admin" && "Requires Admin Access"
                  }
                  placement={"top"}
                  disableInteractive
                >
                  <span>
                    <CustomButton
                      variant="contained"
                      color="default"
                      onClickFunction={handleOpenAddModal}
                      sx={{
                        backgroundColor: colorSchemes.primaryGreen,
                      }}
                      title="Add New Member"
                      disabled={activeUser?.access !== "Admin"}
                    />
                  </span>
                </Tooltip>
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
                        <TableRow key={row.email}>
                          <CustomTableCell value={row.name} type="tableBody" />
                          <CustomTableCell value={row.age} type="tableBody" />
                          <CustomTableCell value={row.email} type="tableBody" />
                          <CustomTableCell value={row.phone} type="tableBody" />
                          <CustomTableCell value={row.role} type="tableBody" />
                          <CustomTableCell
                            value={row.remarks}
                            type="tableBody"
                          />
                          <CustomTableCell
                            value={
                              <Tooltip
                                title={
                                  activeUser?.access !== "Admin" &&
                                  "Requires Admin Access"
                                }
                                placement={"top"}
                                disableInteractive
                              >
                                <ManageAccountsIcon
                                  onClick={() =>
                                    activeUser?.access === "Admin" &&
                                    handleOpenEditModal(row)
                                  }
                                  sx={{
                                    cursor:
                                      activeUser?.access === "Admin" &&
                                      "pointer",
                                    opacity:
                                      activeUser?.access !== "Admin" && 0.5,
                                  }}
                                />
                              </Tooltip>
                            }
                            type="tableBody"
                          />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          ) : (
            <>No Data found!</>
          )}
          {/* Modal */}
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
                  {isEditMode ? (
                    <>
                      {renderFields()}
                      <CustomSelect
                        label="Edit Access"
                        name="access"
                        value={modalFormData.access}
                        onChange={handleInputChange("access")}
                        options={["Admin", "User"]}
                      />
                      <CustomTextField
                        label="Remarks"
                        name="remarks"
                        value={modalFormData.remarks || ""}
                        onChange={handleInputChange("remarks")}
                        multiline
                        rows={3}
                      />
                    </>
                  ) : (
                    <>
                      <CustomSelect
                        label="Add From All Users"
                        name="email"
                        value={modalFormData.email}
                        onChange={handleInputChange("email")}
                        options={availableUsersOptions}
                      />
                      {modalFormData.email && (
                        <>
                          {renderFields()}
                          <CustomSelect
                            label="Edit Access"
                            name="access"
                            value={modalFormData.access}
                            onChange={handleInputChange("access")}
                            options={["Admin", "User"]}
                          />
                          <CustomTextField
                            label="Remarks"
                            name="remarks"
                            value={modalFormData.remarks || ""}
                            onChange={handleInputChange("remarks")}
                            multiline
                            rows={3}
                          />
                        </>
                      )}
                    </>
                  )}
                  <Box
                    sx={{ display: "flex", gap: "20px", float: "right", pt: 3 }}
                  >
                    {isEditMode && (
                      <CustomButton
                        variant="outlined"
                        color="warning"
                        onClickFunction={handleRemoveMember}
                        sx={{ backgroundColor: colorSchemes.whiteBg }}
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
                      sx={{ backgroundColor: colorSchemes.primaryGreen }}
                    />
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Team;
