import { Box, Paper, Typography } from "@mui/material";

const FormContainer = ({ children, title, icon: Icon, wide = false }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      width: "100%",
      maxWidth: 400,
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
      backdropFilter: "blur(8px)",
      backgroundColor: "rgb(255, 255, 255)",
      alignItems: "center",
    }}
  >
    {children}
  </Paper>
);

export default FormContainer;
