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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = ({ onSubmit, isLoading, submitError }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
      email: "",
      password: "",
    };

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

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (validate()) {
      onSubmit(formData).catch((err) => {
        setError(err.message || "Login failed");
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <LockOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
          Sign In
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

      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

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
              marginLeft: "-12px",
            }}
          />
        )}
        <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
          Sign In
        </span>
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Don't have an account?{" "}
        <Link href="/register" underline="hover">
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
