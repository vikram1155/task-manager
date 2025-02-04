import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "350px",
      }}
    >
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        {isLogin ? "Login" : "Sign Up"}
      </Typography>

      {/* Form */}
      <Box component="form" noValidate sx={{ mt: 2 }}>
        {!isLogin && (
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        {!isLogin && (
          <TextField
            margin="normal"
            fullWidth
            label="Role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
          />
        )}

        {!isLogin && (
          <TextField
            margin="normal"
            fullWidth
            label="Age"
            name="age"
            type="text"
            value={formData.age}
            onChange={handleChange}
          />
        )}

        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={
            formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          }
          helperText={
            formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
              ? "Invalid email address"
              : ""
          }
        />

        <TextField
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, textTransform: "none" }}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </Box>

      {/* Toggle Login/Sign Up */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          component="button"
          onClick={() => setIsLogin((prev) => !prev)}
          sx={{ fontWeight: "bold" }}
        >
          {isLogin ? "Sign Up" : "Login"} here
        </Link>
      </Typography>

      {/* Error Message */}
      {error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}
    </Box>
  );
}

export default LoginPage;
