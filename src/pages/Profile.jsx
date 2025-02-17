import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colorSchemes } from "../data/theme";
import { getAllTeamFromApi } from "../utils/api";
import { setTeamMembers } from "../redux/teamMembersSlice";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const quotes = [
  "Debugging: The art of turning 'It works' into 'Why not?'",
  "A programmer’s life: Coffee, code, debug, repeat, and occasional panic.",
  "Software development: Where weekends go to die and bugs come alive.",
  "Code is like a joke; if you have to explain it, rewrite it.",
  "Behind every great program is a frustrated developer who didn't quit.",
  "In coding, failure is a feature, not a bug—learn from it.",
  "Tech teams run on trust, communication, and caffeine-fueled optimism.",
  "Cloud computing: Someone else's computer, but your headache to fix.",
  "Programming: Solving problems you never knew existed in ways you don’t understand.",
  "The best software is written with logic, laughter, and late-night snacks.",
];

const RandomQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "20px",
        fontStyle: "italic",
        p: 4,
      }}
    >
      <FormatQuoteIcon sx={{ fontSize: 80 }} />
      <h3>{randomQuote}</h3>
    </Box>
  );
};
function Profile() {
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllTeamMembersFn = async () => {
      try {
        const getAllTeamMembers = await getAllTeamFromApi();
        dispatch(setTeamMembers(getAllTeamMembers));

        const userInfoFromLocal = JSON.parse(localStorage.getItem("userinfo"));
        const teamMembersMailList = getAllTeamMembers.map((a) => a.email);

        setUserInfo(
          teamMembersMailList.includes(userInfoFromLocal.email)
            ? getAllTeamMembers.find(
                (user) => user.email === userInfoFromLocal.email
              )
            : userInfoFromLocal
        );
      } catch (error) {
        console.error("Error getting team members:", error);
      }
    };
    getAllTeamMembersFn();
  }, [dispatch]);

  // JSX
  return (
    <Card
      sx={{
        mx: "auto",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: colorSchemes.darkBg,
        color: "#fff",
        overflowX: "auto",
      }}
    >
      {userInfo?.email && (
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1.5fr 1fr", xs: "1fr" },
              alignItems: "center",
              m: 4,
              height: "calc(100vh - 300px)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRight: `1px solid ${colorSchemes.primaryGreen}`,
                  px: 4,
                }}
              >
                <AccountCircleIcon
                  sx={{
                    fontSize: "200px",
                    color: colorSchemes.primaryGreen,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: colorSchemes.primaryGreen,
                      textTransform: "uppercase",
                      pb: 1,
                    }}
                  >
                    {userInfo?.name}
                    <br></br>
                    {userInfo?.role}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                my={2}
                width={"fit-content"}
                justifyContent={"space-between"}
                px={4}
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box display={"flex"} alignItems={"center"} gap={0.5}>
                    <Typography>
                      <b>Mail Id: </b>
                      {userInfo?.email}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(userInfo?.email)
                      }
                      sx={{ fontSize: "14px", color: colorSchemes.whiteText }}
                    >
                      <ContentCopyIcon fontSize="12px" />
                    </IconButton>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={0.5}>
                    <Typography>
                      <b>Phone Number: </b>
                      {userInfo?.phone}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(userInfo?.phone)
                      }
                      sx={{ fontSize: "14px", color: colorSchemes.whiteText }}
                    >
                      <ContentCopyIcon fontSize="12px" />
                    </IconButton>
                  </Box>
                  <Typography>
                    <b>Age: </b>
                    {userInfo?.age}
                  </Typography>
                  <Typography>
                    <b>Remarks: </b>
                    {userInfo?.remarks}
                  </Typography>
                </Box>
                <CustomButton
                  variant="outlined"
                  color="default"
                  onClickFunction={() => navigate("/my-tasks")}
                  title="Go To My Tasks"
                  sx={{
                    backgroundColor: colorSchemes.primaryGreen,
                    mt: 3,
                  }}
                />
              </Box>
            </Box>
            <RandomQuote />
          </Box>
        </CardContent>
      )}
    </Card>
  );
}

export default Profile;
