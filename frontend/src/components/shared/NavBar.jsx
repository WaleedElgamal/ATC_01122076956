import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Avatar,
  Box,
  Button,
  Container,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings"; // Added settings icon
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../context/ColorModeContext";

const categories = ["All", "Concerts", "Tech", "Sports"];

const NavBar = ({ selectedCategory, setSelectedCategory, setSnackbar }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { logout } = useAuth();
  const role = localStorage.getItem("userRole");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleThemeToggle = () => {
    colorMode.toggleColorMode();
    handleCloseUserMenu();
  };

  // Dynamic theme mode text
  const themeModeText =
    theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode";

  return (
    <AppBar position="fixed" color="primary" sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 4,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Eventy
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {role == "user" &&
              categories.map((category) => {
                const isSelected =
                  selectedCategory === (category === "All" ? "" : category);
                return (
                  <Button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category === "All" ? "" : category)
                    }
                    sx={{
                      backgroundColor: isSelected ? "white" : "transparent",
                      color: isSelected ? "primary.main" : "white",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? "#f0f0f0"
                          : "rgba(255,255,255,0.2)",
                      },
                      boxShadow: "none",
                      border: "none",
                      textTransform: "none",
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    {category}
                  </Button>
                );
              })}
          </Box>

          <Box>
            <Tooltip title="Settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "white" }}
              >
                <SettingsIcon fontSize="large" />{" "}
                {/* Replaced Avatar with SettingsIcon */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleThemeToggle}>
                <Typography textAlign="center">{themeModeText}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
