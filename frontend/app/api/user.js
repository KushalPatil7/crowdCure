import axios from "./axios.js"

const getUser=async (id) => {
    try{
        const response = await axios.get(`users/${id}`);
        return response.data.data;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw error;    
    }
}


export {getUser}