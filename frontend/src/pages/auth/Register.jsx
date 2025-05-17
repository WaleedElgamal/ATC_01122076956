import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RegisterForm from "../../components/auth/RegisterForm";
import FormContainer from "../../components/auth/FormContainer";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { Box, Typography, Container } from "@mui/material";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      await register(userData);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(
          "An account with this email already exists. Please use a different email."
        );
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
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: 3000,
        maxWidth: 1200,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: 300, md: 600 },
          backgroundImage: "url(/images/background2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: 0,
            right: 0,
            bottom: 0,
            transform: "translateY(0)",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            color="white"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              textAlign: "center",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Join Our Community
          </Typography>
        </Box>
      </Box>

      <FormContainer title="Create Account" icon={HowToRegOutlinedIcon}>
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={isLoading}
          submitError={error}
        />
      </FormContainer>
    </Box>
  );
};

export default RegisterPage;
