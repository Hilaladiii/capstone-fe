import { 
  InternshipApplication, 
  InternshipCompetitionApplication, 
  InternshipExtensionApplication, 
  InternshipCancellationApplication,
  InternshipResponse,
  InternshipStatus 
} from "../../common/types/internshipp.type";
import axiosInstance from "../setup.service";

export class InternshipService {
  static async getApplicationStatus(): Promise<InternshipStatus> {
    const response = await axiosInstance.get<InternshipResponse>("/internship/status");
    return response.data.data[0].status; 
  }

  static submitApplication(data: InternshipApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'groupMembers') {
          return;
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 'true' : 'false');
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
          totalSks: data.totalSks
        },
        ...data.groupMembers
      ];

      const names = allMembers.map(member => member.name).join(',');
      const nims = allMembers.map(member => member.nim).join(',');
      const emails = allMembers.map(member => member.email).join(',');
      const totalSksArray = allMembers.map(member => member.totalSks).join(',');
      const groupPhoneNumber = data.phoneNumber || "081234567890";

      form.set('name', names);
      form.set('nim', nims);
      form.set('phoneNumber', groupPhoneNumber);
      form.set('email', emails);
      form.set('totalSks', totalSksArray);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, ''); 
        const formattedPhone = cleanPhone.padEnd(12, '0').substring(0, 12);
        form.set('phoneNumber', formattedPhone);
      }
    }

    return axiosInstance.post('/internship/application/company', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static submitCompetitionApplication(data: InternshipCompetitionApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'groupMembers') {
          return;
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 'true' : 'false');
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
          totalSks: data.totalSks
        },
        ...data.groupMembers
      ];

      const names = allMembers.map(member => member.name).join(',');
      const nims = allMembers.map(member => member.nim).join(',');
      const emails = allMembers.map(member => member.email).join(',');
      const totalSksArray = allMembers.map(member => member.totalSks).join(',');
      const groupPhoneNumber = data.phoneNumber || "081234567890";

      form.set('name', names);
      form.set('nim', nims);
      form.set('phoneNumber', groupPhoneNumber);
      form.set('email', emails);
      form.set('totalSks', totalSksArray);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, ''); 
        const formattedPhone = cleanPhone.padEnd(12, '0').substring(0, 12);
        form.set('phoneNumber', formattedPhone);
      }
    }

    return axiosInstance.post('/internship/application/competition', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static submitExtensionApplication(data: InternshipExtensionApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'groupMembers') {
          return;
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 'true' : 'false');
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
          totalSks: data.totalSks
        },
        ...data.groupMembers
      ];

      const names = allMembers.map(member => member.name).join(',');
      const nims = allMembers.map(member => member.nim).join(',');
      const emails = allMembers.map(member => member.email).join(',');
      const totalSksArray = allMembers.map(member => member.totalSks).join(',');
      const groupPhoneNumber = data.phoneNumber || "081234567890";

      form.set('name', names);
      form.set('nim', nims);
      form.set('phoneNumber', groupPhoneNumber);
      form.set('email', emails);
      form.set('totalSks', totalSksArray);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, ''); 
        const formattedPhone = cleanPhone.padEnd(12, '0').substring(0, 12);
        form.set('phoneNumber', formattedPhone);
      }
    }

    return axiosInstance.post('/internship/extension', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static submitCancellationApplication(data: InternshipCancellationApplication) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'groupMembers') {
          return;
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 'true' : 'false');
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
          totalSks: '' 
        },
        ...data.groupMembers
      ];

      const names = allMembers.map(member => member.name).join(',');
      const nims = allMembers.map(member => member.nim).join(',');
      const emails = allMembers.map(member => member.email).join(',');
      const groupPhoneNumber = data.phoneNumber || "081234567890";

      form.set('name', names);
      form.set('nim', nims);
      form.set('phoneNumber', groupPhoneNumber);
      form.set('email', emails);
    } else {
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, ''); 
        const formattedPhone = cleanPhone.padEnd(12, '0').substring(0, 12);
        form.set('phoneNumber', formattedPhone);
      }
    }

    return axiosInstance.post('/internship/cancellation', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}