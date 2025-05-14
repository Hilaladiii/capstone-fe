import axios from "axios";

interface FormData {
  fullname: string;
  nim: string;
  agencyName: string;
  position: string;
  activityDescription: string;
}

const consultationAPI = "http://127.0.0.1:3000/consultation";

export const requestConsultation = async (formData: FormData, token: string) => {
  try {
    const response = await axios.post(
      consultationAPI,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "API request failed");
  }
};
