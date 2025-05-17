import { jwtDecode } from "jwt-decode";
const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.userId,
      email: decoded.sub,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export default getCurrentUser;
