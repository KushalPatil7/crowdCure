import { jwtDecode } from 'jwt-decode';

const getUserId = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);  // This confirms the structure
    return decoded._id;  // Use _id instead of userId
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export { getUserId };
