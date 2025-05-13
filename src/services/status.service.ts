import axios from "axios";
import { API_BASE_URL } from "../common/constants";

interface StatusResponse {
  statusCode: number;
  message: string;
  data: {
    status: string;
  }[];
}

export const getApplicationStatus = async (token: string): Promise<string> => {
  try {
    const response = await axios.get<StatusResponse>(`${API_BASE_URL}/internship/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const documentStatus = response.data?.data[0]?.status;

    if (documentStatus) {
      return documentStatus;
    } else {
      throw new Error("Status dokumen tidak ditemukan.");
    }
  } catch (error) {
    console.error("Error fetching the status:", error);
    throw new Error("Gagal mendapatkan status pengajuan.");
  }
};
