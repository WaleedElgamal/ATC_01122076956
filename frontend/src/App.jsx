import "./App.css";
import React from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/user/Home";
import ProtectedRoute from "./context/ProtectedRoute";
import EventDetailsPage from "./pages/user/EventDetailsPage";
import CongratsPage from "./pages/user/CongratsPage";
import AdminHome from "./pages/admin/Home";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeContext } from "./context/ColorModeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = () => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#3f51b5",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/home" element={<AdminHome />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/user/home" element={<Home />} />
                <Route path="/user/events/:id" element={<EventDetailsPage />} />
                <Route path="/user/congrats" element={<CongratsPage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
