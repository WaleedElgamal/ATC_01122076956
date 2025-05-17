import { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

const RegisterForm = ({ onSubmit, isLoading, submitError }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
      form: "",
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password ";
      valid = false;
    } else if (formData.confirmPassword.length < 6) {
      newErrors.confirmPassword = "Password must be at least 6 characters";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (validate()) {
      onSubmit(formData).catch((err) => {
        setError(err.message || "Registration failed");
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <HowToRegOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
          Create Account
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Box>

      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              left: "50%",
              marginLeft: "-12px", // Half of progress size
            }}
          />
        )}
        <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
          Register
        </span>
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/login" underline="hover">
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
