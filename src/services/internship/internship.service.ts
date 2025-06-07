import { 
  InternshipApplication, 
  InternshipCompetitionApplication, 
  InternshipExtensionApplication, 
  InternshipCancellationApplication, 
  InternshipResponse, 
  InternshipStatus,
  InternshipType,
  GetInternshipResponse,
  InternshipExtensionResponse,
  InternshipCompetitionResponse,
  InternshipCompanyResponse,
  InternshipCancellationResponse,
  UpdateCompetitionStatusData
} from "../../common/types/internship.type";
import axiosInstance from "../setup.service";

type InternshipResponseMap = {
  [InternshipType.EXTENSION]: InternshipExtensionResponse;
  [InternshipType.COMPETITION]: InternshipCompetitionResponse;
  [InternshipType.COMPANY]: InternshipCompanyResponse;
  [InternshipType.CANCELLATION]: InternshipCancellationResponse;
};

export class InternshipService {
  static async getApplicationStatus(): Promise<InternshipStatus> {
    const response = await axiosInstance.get<InternshipResponse>("/internship/status");
    return response.data.data[0].status;
  }
  
  static async getInternships<T extends InternshipType>(type: T): Promise<GetInternshipResponse<InternshipResponseMap[T]>> {
    const response = await axiosInstance.get<GetInternshipResponse<InternshipResponseMap[T]>>("/internship", {
      params: { type }
    });
    return response.data;
  }
  
  static submitApplication(data: InternshipApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "groupMembers") {
          return;
        } else if (typeof value === "boolean") {
          form.append(key, value ? "true" : "false");
        } else {
          form.append(key, value as string | Blob);
        }
      }
    });
    if (data.isGroup && data.groupMembers.length > 0) {
      const allMembers = [
        {
          name: data.name,
          nim: data.nim,
          phoneNumber: data.phoneNumber,
          email: data.email,
          totalSks: data.totalSks,
        },
        ...data.groupMembers,
      ];
      const names = allMembers.map((member) => member.name).join(",");
      const nims = allMembers.map((member) => member.nim).join(",");
      const emails = allMembers.map((member) => member.email).join(",");
      const totalSksArray = allMembers.map((member) => member.totalSks).join(",");
      const groupPhoneNumber = data.phoneNumber || "081234567890";
      form.set("name", names);
      form.set("nim", nims);
      form.set("phoneNumber", groupPhoneNumber);
      form.set("email", emails);
      form.set("totalSks", totalSksArray);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, "");
        const formattedPhone = cleanPhone.padEnd(12, "0").substring(0, 12);
        form.set("phoneNumber", formattedPhone);
      }
    }
    return axiosInstance.post("/internship/application/company", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  static submitCompetitionApplication(data: InternshipCompetitionApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "groupMembers") {
          return;
        } else if (typeof value === "boolean") {
          form.append(key, value ? "true" : "false");
        } else {
          form.append(key, value as string | Blob);
        }
      }
    });
    if (data.isGroup && data.groupMembers.length > 0) {
      const allMembers = [
        {
          name: data.name,
          nim: data.nim,
          phoneNumber: data.phoneNumber,
          email: data.email,
          totalSks: data.totalSks,
        },
        ...data.groupMembers,
      ];
      const names = allMembers.map((member) => member.name).join(",");
      const nims = allMembers.map((member) => member.nim).join(",");
      const emails = allMembers.map((member) => member.email).join(",");
      const totalSksArray = allMembers.map((member) => member.totalSks).join(",");
      const groupPhoneNumber = data.phoneNumber || "081234567890";
      form.set("name", names);
      form.set("nim", nims);
      form.set("phoneNumber", groupPhoneNumber);
      form.set("email", emails);
      form.set("totalSks", totalSksArray);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, "");
        const formattedPhone = cleanPhone.padEnd(12, "0").substring(0, 12);
        form.set("phoneNumber", formattedPhone);
      }
    }
    return axiosInstance.post("/internship/application/competition", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  static submitExtensionApplication(data: InternshipExtensionApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "groupMembers") {
          return;
        } else if (typeof value === "boolean") {
          form.append(key, value ? "true" : "false");
        } else {
          form.append(key, value as string | Blob);
        }
      }
    });
    if (data.isGroup && data.groupMembers && data.groupMembers.length > 0) {
      const allMembers = [
        {
          name: data.name,
          nim: data.nim,
          phoneNumber: data.phoneNumber,
          email: data.email,
          totalSks: data.totalSks,
        },
        ...data.groupMembers,
      ];
      const names = allMembers.map((member) => member.name).join(",");
      const nims = allMembers.map((member) => member.nim).join(",");
      const emails = allMembers.map((member) => member.email).join(",");
      const totalSksArray = allMembers.map((member) => member.totalSks).join(",");
      const groupPhoneNumber = data.phoneNumber || "081234567890";
      form.set("name", names);
      form.set("nim", nims);
      form.set("phoneNumber", groupPhoneNumber);
      form.set("email", emails);
      form.set("totalSks", totalSksArray);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, "");
        const formattedPhone = cleanPhone.padEnd(12, "0").substring(0, 12);
        form.set("phoneNumber", formattedPhone);
      }
    }
    return axiosInstance.post("/internship/extension", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  static submitCancellationApplication(data: InternshipCancellationApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "groupMembers") {
          return;
        } else if (typeof value === "boolean") {
          form.append(key, value ? "true" : "false");
        } else {
          form.append(key, value as string | Blob);
        }
      }
    });
    if (data.isGroup && data.groupMembers && data.groupMembers.length > 0) {
      const allMembers = [
        {
          name: data.name,
          nim: data.nim,
          phoneNumber: data.phoneNumber,
          email: data.email,
          totalSks: "",
        },
        ...data.groupMembers,
      ];
      const names = allMembers.map((member) => member.name).join(",");
      const nims = allMembers.map((member) => member.nim).join(",");
      const emails = allMembers.map((member) => member.email).join(",");
      const groupPhoneNumber = data.phoneNumber || "081234567890";
      form.set("name", names);
      form.set("nim", nims);
      form.set("phoneNumber", groupPhoneNumber);
      form.set("email", emails);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, "");
        const formattedPhone = cleanPhone.padEnd(12, "0").substring(0, 12);
        form.set("phoneNumber", formattedPhone);
      }
    }
    return axiosInstance.post("/internship/cancellation", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static updateCompetitionStatus(documentId: string, data: UpdateCompetitionStatusData) {
  const form = new FormData();
  
  // Add status
  form.append('status', data.status);
  
  // Add rejectionReason if it exists
  if (data.rejectionReason) {
    form.append('rejectionReason', data.rejectionReason);
  }
  
  // Add files if they exist
  if (data.internshipVerificationCompetitionLetterFile) {
    form.append('internshipVerificationCompetitionLetterFile', data.internshipVerificationCompetitionLetterFile);
  }
  
  if (data.internshipDeterminationCompetitionLetterFile) {
    form.append('internshipDeterminationCompetitionLetterFile', data.internshipDeterminationCompetitionLetterFile);
  }
  
  if (data.studyResultCardFile) {
    form.append('studyResultCardFile', data.studyResultCardFile);
  }
  
  if (data.proposalCompetitionSertificationFile) {
    form.append('proposalCompetitionSertificationFile', data.proposalCompetitionSertificationFile);
  }
  
  return axiosInstance.patch(`/internship/${documentId}/competition`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
}