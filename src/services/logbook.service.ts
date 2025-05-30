import axios from "axios";

// Base URL for the API
const BASE_URL = "http://127.0.0.1:3000/logbook";

// Fetch logbooks for the student
export const fetchLogbooks = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching logbooks:", error);
    throw error;
  }
};

// Create a new logbook
export const createLogbook = async (
  description: string,
  file: File,
  duration: string,
  token: string
) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("file", file);
  formData.append("duration", duration);

  try {
    const response = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating logbook:", error);
    throw error;
  }
};
