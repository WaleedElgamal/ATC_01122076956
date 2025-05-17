import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";
import FormContainer from "../../components/auth/FormContainer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Container } from "@mui/material";
import { set } from "mongoose";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      await login(credentials);
      if (localStorage.getItem("userRole") === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      if (error.response) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url(/images/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <FormContainer title="Sign In" icon={LockOutlinedIcon}>
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              submitError={error}
            />
          </FormContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
