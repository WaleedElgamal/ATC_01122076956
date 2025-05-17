import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import api from "../../api/axios";
import EventFormDialog from "../../components/admin/EventFormDialog";
import NavBar from "../../components/shared/NavBar";

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  const categories = ["Concerts", "Tech", "Sports"];

  useEffect(() => {
    fetchEvents();
  }, [page, rowsPerPage, category]);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `/events?page=${page}&size=${rowsPerPage}`;

      if (category) {
        url = `/events/category?category=${category}&page=${page}&size=${rowsPerPage}`;
      }

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(response.data.content || response.data); // Handle different response structures
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch events", err);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentEvent({
      name: "",
      description: "",
      date: "",
      venue: "",
      price: "",
      imageUrl: "",
      category: "",
    });
    setOpenDialog(true);
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      await api.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSuccess = (message) => {
    setOpenDialog(false);
    setSuccess(message || "Operation completed successfully");
    fetchEvents();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Event Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleCreate}>
          Add Event
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="Filter by Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => {
              // Handle both direct event and nested event object
              const eventData = event.event || event;
              return (
                <TableRow key={eventData.id}>
                  <TableCell>{eventData.name}</TableCell>
                  <TableCell>
                    {new Date(eventData.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{eventData.venue}</TableCell>
                  <TableCell>EGP {eventData.price}</TableCell>
                  <TableCell>{eventData.category}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(eventData)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(eventData.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalPages * rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 10, 25]}
      />

      <EventFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        event={currentEvent}
        onSuccess={handleSubmitSuccess}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventsManager;
