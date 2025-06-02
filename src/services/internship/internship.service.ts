// Update untuk internship.service.ts - tambahkan method untuk competition
import { InternshipApplication, InternshipCompetitionApplication } from "../../common/types/internshipp.type";
import axiosInstance from "../setup.service";

export class InternshipService {
  static submitApplication(data: InternshipApplication) {
    const form = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'groupMembers') {
          // Skip groupMembers as we'll handle them separately
          return;
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 'true' : 'false');
        } else {
          form.append(key, value as string | Blob);
        }
      }
    });

    // Handle group data format for backend
    if (data.isGroup && data.groupMembers.length > 0) {
      // Combine leader data with group members data
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

      // Create comma-separated strings for each field (except phoneNumber)
      const names = allMembers.map(member => member.name).join(',');
      const nims = allMembers.map(member => member.nim).join(',');
      const emails = allMembers.map(member => member.email).join(',');
      const totalSksArray = allMembers.map(member => member.totalSks).join(',');

      // For group applications, use a single phone number (leader's phone or placeholder)
      const groupPhoneNumber = data.phoneNumber || "081234567890"; // Default if no phone provided

      // Override the individual fields with group data
      form.set('name', names);
      form.set('nim', nims);
      form.set('phoneNumber', groupPhoneNumber); // Single phone number, not comma-separated
      form.set('email', emails);
      form.set('totalSks', totalSksArray);
    } else {
      // For individual applications, ensure phone number is properly formatted
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, ''); // Remove non-digits
        // Ensure we have at least 10 digits, pad to 12 if needed
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
          // Skip groupMembers as we'll handle them separately
          return;
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 'true' : 'false');
        } else {
          form.append(key, value as string | Blob);
        }
      }
    });

    // Handle group data format for backend
    if (data.isGroup && data.groupMembers.length > 0) {
      // Combine leader data with group members data
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

      // Create comma-separated strings for each field (except phoneNumber)
      const names = allMembers.map(member => member.name).join(',');
      const nims = allMembers.map(member => member.nim).join(',');
      const emails = allMembers.map(member => member.email).join(',');
      const totalSksArray = allMembers.map(member => member.totalSks).join(',');

      // For group applications, use a single phone number (leader's phone or placeholder)
      const groupPhoneNumber = data.phoneNumber || "081234567890"; // Default if no phone provided

      // Override the individual fields with group data
      form.set('name', names);
      form.set('nim', nims);
      form.set('phoneNumber', groupPhoneNumber); // Single phone number, not comma-separated
      form.set('email', emails);
      form.set('totalSks', totalSksArray);
    } else {
      // For individual applications, ensure phone number is properly formatted
      if (data.phoneNumber && data.phoneNumber.length > 0) {
        const cleanPhone = data.phoneNumber.replace(/\D/g, ''); // Remove non-digits
        // Ensure we have at least 10 digits, pad to 12 if needed
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
}