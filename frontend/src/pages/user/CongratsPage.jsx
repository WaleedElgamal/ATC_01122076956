import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Fade,
  Zoom,
  useTheme,
  styled,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: "center",
  maxWidth: 600,
  margin: "0 auto",
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const CongratsPage = () => {
  const theme = useTheme();
  const [showConfetti, setShowConfetti] = React.useState(true);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: theme.palette.white,
        p: 3,
      }}
    >
      {/* Confetti effect - remove if not needed */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <Fade in={true} timeout={800}>
        <StyledPaper elevation={6}>
          <Zoom in={true} style={{ transitionDelay: "300ms" }}>
            <CelebrationIcon
              sx={{
                fontSize: 80,
                color: theme.palette.success.main,
                mb: 3,
              }}
            />
          </Zoom>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Congratulations!
          </Typography>

          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            You've successfully booked your event. We hope you have a great
            time!
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<CelebrationIcon />}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[4],
              },
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/user/home")}
          >
            Back to Home
          </Button>
        </StyledPaper>
      </Fade>
    </Box>
  );
};

export default CongratsPage;
