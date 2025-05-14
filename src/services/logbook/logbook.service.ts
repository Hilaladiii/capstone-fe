import { Logbook } from "../../common/validation/logbook.validation";
import axiosInstance from "../setup.service";

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
}
