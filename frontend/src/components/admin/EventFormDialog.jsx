import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import api from "../../api/axios";
import { useState, useEffect } from "react";

export default function EventFormDialog({ open, onClose, event, onSuccess }) {
  const [formData, setFormData] = useState(event);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setFormData(event);
    setErrors({});
    setSubmitError("");
  }, [event, open]);

  const validate = () => {
    const newErrors = {};
    if (!formData?.name) newErrors.name = "Event Name is required";
    if (!formData?.description)
      newErrors.description = "Description is required";
    if (!formData?.date) newErrors.date = "Date is required";
    if (!formData?.venue) newErrors.venue = "Venue is required";
    if (!formData?.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitError("");
    if (!validate()) return;
    try {
      const token = localStorage.getItem("token");
      if (formData.id) {
        await Promise.all([
          api.put(`/events/${formData.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
      } else {
        await Promise.all([
          api.post("/events", formData, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
      }
      onSuccess();
    } catch (error) {
      setSubmitError("Error saving event. Please try again.");
      console.error("Error saving event:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        {formData?.id ? "Edit Event" : "Create Event"}
      </DialogTitle>
      <DialogContent dividers>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              label="Event Name"
              fullWidth
              value={formData?.name || ""}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              margin="normal"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData?.description || ""}
              error={!!errors.description}
              helperText={errors.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              label="Date"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData?.date.slice(0, 16) || ""}
              error={!!errors.date}
              helperText={errors.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <TextField
              margin="normal"
              label="Venue"
              fullWidth
              value={formData?.venue || ""}
              error={!!errors.venue}
              helperText={errors.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
            />
            <TextField
              margin="normal"
              label="Price"
              type="number"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
              value={formData?.price || ""}
              error={!!errors.price}
              helperText={errors.price}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, "");
                setFormData({ ...formData, price: value });
              }}
            />
            <TextField
              margin="normal"
              label="Image URL"
              fullWidth
              value={formData?.imageUrl || ""}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
