import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTeamFromApi } from "../utils/api";
import { setTeamMembers } from "../redux/teamMembersSlice";
import CustomLoader from "../components/CustomLoader";
import CustomError from "../components/CustomError";

const InfoRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" py={2}>
    <Typography fontWeight="500">{label}:</Typography>
    <Typography color="text.secondary">{value || "N/A"}</Typography>
  </Box>
);

function Profile() {
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState();
  const [apiState, setApiState] = useState({ loading: true, error: false });

  useEffect(() => {
    const getAllTeamMembersFn = async () => {
      try {
        const getAllTeamMembers = await getAllTeamFromApi();
        dispatch(setTeamMembers(getAllTeamMembers));
        setActiveUser(
          getAllTeamMembers.filter(
            (user) => user.mailId === "markiv1155@gmail.com"
          )
        );
        setApiState({ loading: false, error: false });
      } catch (error) {
        console.error("Error gettings tasks:", error);
        setApiState({ loading: false, error: true });
      }
    };
    getAllTeamMembersFn();
  }, [dispatch]);

  const user = activeUser?.length && activeUser[0];

  console.log("a-activeUser", activeUser);

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
          {activeUser?.length ? (
            <Card
              sx={{
                maxWidth: "90%",
                mx: "auto",
                mt: 4,
                p: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  gutterBottom
                >
                  User Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" flexDirection="column" gap={1} my={2}>
                  <InfoRow label="Name" value={user.name} />
                  <InfoRow label="Age" value={user.age} />
                  <InfoRow label="Mail Id" value={user.mailId} />
                  <InfoRow label="Phone" value={user.phone} />
                  <InfoRow label="Remarks" value={user.remarks} />
                  <InfoRow label="Role" value={user.role} />
                </Box>
              </CardContent>
            </Card>
          ) : (
            <>Loading</>
          )}
        </>
      )}
    </Box>
  );
}

export default Profile;
