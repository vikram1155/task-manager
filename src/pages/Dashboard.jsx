import { Box } from "@mui/material";
import React from "react";

function Dashboard() {
  const isUserValid = JSON.parse(localStorage.getItem("userinfo"));

  return <Box>{isUserValid?.valid ? <Box>Hello</Box> : <Box>No</Box>}</Box>;
}

export default Dashboard;
