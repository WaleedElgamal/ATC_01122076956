import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  CardMedia,
  Pagination,
  CircularProgress,
} from "@mui/material";
import NavBar from "../../components/shared/NavBar";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../../utils/JwtDecoder";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = getCurrentUser();

  useEffect(() => {
    fetchEvents();
  }, [page, category]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = `/events?page=${page}&size=6`;

      if (category)
        url = `/events/category?category=${category}&page=${page}&size=6`;

      const [res, delay] = await Promise.all([
        api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      setEvents(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (eventId) => {
    setLoading(true);
    try {
      const [res, delay] = await Promise.all([
        api.post(
          `/bookings/${eventId}/${user.id}`,
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NavBar selectedCategory={category} setSelectedCategory={setCategory} />
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
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar selectedCategory={category} setSelectedCategory={setCategory} />

      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          maxWidth: "lg",
          margin: "0 auto",
          paddingTop: 6,
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {events.map(({ event, booked }) => (
            <Grid
              item
              key={event.id}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                onClick={() =>
                  navigate(`/user/events/${event.id}/`, {
                    state: { event, booked },
                  })
                }
                sx={{
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: 350,
                }}
              >
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    image={
                      event.imageUrl ||
                      "https://via.placeholder.com/300x180?text=No+Image"
                    }
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                    alt={event.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {event.name}
                    </Typography>
                    {booked ? (
                      <Chip label="Booked" color="success" sx={{ mt: 2 }} />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBook(event.id);
                        }}
                      >
                        Book Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
