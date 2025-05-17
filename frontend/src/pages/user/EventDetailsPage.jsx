import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  Chip,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import getCurrentUser from "../../utils/JwtDecoder";
import api from "../../api/axios";

const EventDetailsPage = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const event = state?.event;
  const booked = state?.booked;
  const token = localStorage.getItem("token");
  const user = getCurrentUser();

  const handleBook = async () => {
    try {
      const [res, delay] = await Promise.all([
        api.post(
          `/bookings/${event.id}/${user.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        new Promise((resolve) => setTimeout(resolve, 1000)), // Minimum 1 second delay
      ]);
      navigate("/user/congrats");
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  if (!event) return <Typography>Event not found.</Typography>;

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={80} color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Image Card (Round) */}
      <Card
        sx={{
          borderRadius: "50%",
          width: 200,
          height: 200,
          margin: "0 auto 2rem",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={event.imageUrl || "https://via.placeholder.com/300x300"}
          alt={event.name}
          sx={{ objectFit: "cover" }}
        />
      </Card>

      {/* Details Card (Round) */}
      <Card
        sx={{
          borderRadius: 4,
          p: 3,
          mb: 3,
          boxShadow: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" component="h1" textAlign="center">
            {event.name}
          </Typography>

          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Typography variant="body2">
              <strong>Category:</strong> {event.category}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong> {event.date}
            </Typography>
            <Typography variant="body2">
              <strong>Venue:</strong> {event.venue}
            </Typography>
            <Typography variant="body2">
              <strong>Price:</strong> EGP {event.price}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* Action Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        {booked ? (
          <Chip
            label="Booked"
            color="success"
            sx={{ px: 3, py: 1.5, fontSize: "1rem" }}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 4,
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: 3,
            }}
            onClick={handleBook}
          >
            Book Now
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EventDetailsPage;
