import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../redux/snackbarSlice";

const CustomSnackBar = () => {
  const { message, open } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        "& .MuiSnackbarContent-message": {
          display: "flex",
          justifyContent: "center",
          width: "100%",
        },
      }}
    />
  );
};

export default CustomSnackBar;
