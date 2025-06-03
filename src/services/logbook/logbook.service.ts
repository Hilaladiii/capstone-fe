import { Logbook } from "../../common/validation/logbook.validation";
import axiosInstance from "../setup.service";

// Type for update data - sesuai dengan UpdateLogbookDto di backend
export interface UpdateLogbookData {
  description?: string;
  duration?: number;
  file?: File;
}

export class LogbookService {
  static create(data: Logbook) {
    const form = new FormData();
    form.append("description", data.description);
    form.append("date", data.date);
    form.append("duration", data.duration.toString());
    form.append("file", data.file);

    return axiosInstance.post("/logbook", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static getStudentLogbook() {
    return axiosInstance.get("/logbook/student");
  }

  static update(logbookId: string, data: UpdateLogbookData) {
    const form = new FormData();
    
    // Append data yang ada (sesuai dengan backend validation)
    if (data.description !== undefined) {
      form.append("description", data.description);
    }
    
    if (data.duration !== undefined) {
      form.append("duration", data.duration.toString());
    }
    
    if (data.file !== undefined) {
      form.append("file", data.file);
    }

    // Gunakan endpoint yang benar: PUT /logbook/:id
    return axiosInstance.put(`/logbook/${logbookId}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static delete(logbookId: string) {
    return axiosInstance.delete(`/logbook/${logbookId}`);
  }
}