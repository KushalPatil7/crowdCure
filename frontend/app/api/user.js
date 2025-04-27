import axios from "./axios.js";

const getUser = async (id) => {
    try {
        const response = await axios.get(`users/profile/${id}`);
        return response.data.data; // Assuming the backend returns { data: ... }
    } catch (error) {
        // Log the error details to help debugging
        if (error.response) {
            // Server responded with a status code outside of the 2xx range
            console.error("Error fetching user:", error.response.data);
            throw new Error(`Error fetching user: ${error.response.data.message || "Unknown error"}`);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response from server:", error.request);
            throw new Error("No response from server. Please try again.");
        } else {
            // Something else went wrong
            console.error("Error:", error.message);
            throw new Error(`An unexpected error occurred: ${error.message}`);
        }
    }
};

export { getUser };
