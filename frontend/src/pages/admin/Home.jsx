import { Box } from "@mui/material";
import EventsManager from "../../components/admin/EventManager";
import NavBar from "../../components/shared/NavBar";

const Home = () => {
  return (
    <Box>
      <NavBar />
      <EventsManager />
    </Box>
  );
};
export default Home;
