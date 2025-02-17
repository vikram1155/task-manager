import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { colorSchemes } from "../data/theme";
import CustomTextField from "../components/CustomTextField";
import CustomHeader from "../components/CustomHeader";
import taskHubLogo from "../assets/taskHubLogo.svg";
import {
  createNewUserFromApi,
  getAllUsersFromApi,
  loginUserFromApi,
} from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setTeamMembers } from "../redux/teamMembersSlice";
import { showSnackbar } from "../redux/snackbarSlice";

function LoginPage({ setAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    age: null,
    role: "",
    password: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Error Handlers
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    const { name, role, password, email, age, phone } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.push({ field: "email", error: "Email is required" });
    else if (!emailRegex.test(email))
      errors.push({ field: "email", error: "Invalid email format" });

    // Password validation
    if (!password)
      errors.push({ field: "password", error: "Password is required" });

    // Name validation
    if (!isLogin && !name)
      errors.push({ field: "name", error: "Name is required" });

    // Role validation
    if (!isLogin && !role)
      errors.push({ field: "role", error: "Role is required" });

    // Age validation
    if (age && !/^[0-9]+$/.test(age)) {
      errors.push({ field: "age", error: "Age must be a number" });
    }

    // Phone validation
    if (!phone)
      errors.push({ field: "phone", error: "Phone number is required" });
    else if (!/^[0-9]{10}$/.test(phone)) {
      errors.push({ field: "phone", error: "Phone number must be 10 digits" });
    }

    setFormErrors(errors);
  }, [formData, isLogin]);

  // Validations
  const isFormValid =
    formErrors.length === 0 && Object.values(formData).every((val) => val);
  const isFormFilled = Object.values(formData).every((val) => val);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isLoginFieldsFilled =
    isLogin &&
    formData.email !== "" &&
    formData.password !== "" &&
    emailRegex.test(formData.email);

  useEffect(() => {
    const getAllUsersFromApiFn = async () => {
      try {
        const getAllTeamMembers = await getAllUsersFromApi();
        dispatch(setTeamMembers(getAllTeamMembers));
      } catch (error) {
        console.error("Error gettings tasks:", error);
      }
    };
    getAllUsersFromApiFn();
  }, [dispatch]);

  const existingMembers = useSelector((state) => state.teamMembers.teamMembers);

  const handleSubmit = async () => {
    const authenticateUser = (userDetails) => {
      localStorage.setItem("userinfo", JSON.stringify(userDetails));
      localStorage.setItem("isAuthenticated", "true");
      setAuthenticated(true);
      navigate("/");
    };

    const handleApiError = (error) => {
      const errorMessage =
        error.response?.data?.detail || "Network error. Please try again.";
      setError(errorMessage);
    };

    try {
      if (isLogin) {
        const response = await loginUserFromApi({
          email: formData.email,
          password: formData.password,
        });
        if (response.status.code === 200) {
          authenticateUser(response.data.userDetails);
          dispatch(showSnackbar("Logged In Successfully!"));
        }
      } else if (!isLogin && formErrors?.length === 0) {
        const emailExists = existingMembers.some(
          (member) => member.email === formData.email
        );
        const phoneExists = existingMembers.some(
          (member) => member.phone === formData.phone
        );

        if (emailExists) {
          dispatch(showSnackbar("Email already registered!"));
          return;
        }
        if (phoneExists) {
          dispatch(showSnackbar("Phone Number already registered!"));
          return;
        }

        const response = await createNewUserFromApi(formData);
        if (response.status.code === 200) {
          authenticateUser(response.data.userDetails);
          dispatch(showSnackbar("Signed Up Successfully!"));
        }
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "calc(50% - 37px)",
        transform: "translate(-50%, -50%)",
        maxWidth: "350px",
        minWidth: "250px",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          pb: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <CustomHeader value="TaskHub" />
        <img src={taskHubLogo} alt="TaskHub Logo" style={{ width: "24px" }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          border: `1px solid ${colorSchemes.primaryGreen}`,
          borderRadius: "8px",
        }}
      >
        {/* Title */}
        <CustomHeader value={isLogin ? "Login" : "Sign Up"} />

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: 2 }}>
          {!isLogin && (
            <CustomTextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          {!isLogin && (
            <CustomTextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          )}

          {!isLogin && (
            <CustomTextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          )}

          <CustomTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={
              formData.email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
            }
            helperText={
              formData.email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                ? "Invalid email address"
                : ""
            }
          />
          {!isLogin && (
            <CustomTextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={formData.phone && formData.phone.length !== 10}
              helperText={
                formData.phone && formData.phone.length !== 10
                  ? "Invalid Phone Number"
                  : ""
              }
            />
          )}

          <CustomTextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
          />

          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomButton
              variant="contained"
              color="primary"
              onClickFunction={handleSubmit}
              title={isLogin ? "Login" : "Sign Up"}
              sx={{
                mt: 2,
                backgroundColor: colorSchemes.primaryGreen,
              }}
              fullWidth
              disabled={isLogin ? !isLoginFieldsFilled : !isFormValid}
            />
            <Typography fontSize={12} color="red">
              {!isLogin && isFormFilled && formErrors.length > 0
                ? formErrors[0].error
                : ""}
            </Typography>
          </Box>
        </Box>

        {/* Toggle Login/Sign Up */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <br></br>
          <Link
            component="button"
            onClick={() => setIsLogin((prev) => !prev)}
            style={{
              fontWeight: "bold",
              color: colorSchemes.primaryGreen,
            }}
          >
            {isLogin ? "Sign Up" : "Login"} here
          </Link>
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography sx={{ color: "red", mt: 2, fontSize: "12px" }}>
            {error}!
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default LoginPage;
