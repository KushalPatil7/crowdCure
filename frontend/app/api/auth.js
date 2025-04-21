import axios from "./axios.js"

const loginUser=async (email, password) => {
    try{
        const response = await axios.post("users/login", { email, password });
        return response.data.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;    
    }
}

const registerUser=async (name, email, password) => {
    try{
        const response = await axios.post("users/register", { name, email, password });
        return response.data.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;    
    }
}

export {loginUser, registerUser};