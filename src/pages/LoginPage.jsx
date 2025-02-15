import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { colorSchemes } from "../data/theme";
import CustomTextField from "../components/CustomTextField";
import CustomHeader from "../components/CustomHeader";
import taskHubLogo from "../assets/taskHubLogo.svg";

function LoginPage({ setAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    password: "",
    email: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  console.log("a-isFormValid", isFormValid);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const { name, role, password, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const isEmailValid = emailRegex.test(email);
    const areFieldsFilled =
      email && password && (!isLogin ? name && role : true);

    setIsFormValid(isEmailValid && areFieldsFilled);
  }, [formData, isLogin]);

  // Handle form submission
  const handleSubmit = () => {
    const { email, password, name, role } = formData;

    if (isLogin) {
      // Login logic
      if (email === "markiv1155@gmail.com" && password === "123") {
        const userInfo = { name, role, password, email, valid: true };
        localStorage.setItem("userinfo", JSON.stringify(userInfo));
        localStorage.setItem("isAuthenticated", "true");
        setAuthenticated(true);
        navigate("/");
      } else {
        setError("Invalid credentials! Retry!");
      }
    } else {
      // Sign up logic
      const userInfo = { name, role, password, email, valid: true };
      localStorage.setItem("userinfo", JSON.stringify(userInfo));
      localStorage.setItem("isAuthenticated", "true");
      setAuthenticated(true);
      navigate("/");
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

          <CustomTextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Box sx={{ width: "100%", textAlign: "center" }}>
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
            />
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
        {error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}
      </Box>
    </Box>
  );
}

export default LoginPage;
