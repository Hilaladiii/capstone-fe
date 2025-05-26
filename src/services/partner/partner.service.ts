import axiosInstance from "../setup.service";
import {
  PartnerResponse,
  SinglePartnerResponse,
  CreatePartnerRequest,
  UpdatePartnerRequest,
} from "../../common/types/partner.type";

export class PartnerService {
  static getAllPartners(currPage: number, dataPerPage: number, orderBy: string, name: string, city: string) {
    return axiosInstance.get<PartnerResponse>("/partner", {
      params: {
        currPage,
        dataPerPage,
        orderBy,
        name,
        city,
      },
    });
  }

  static getPartnerById(partnerId: string) {
    return axiosInstance.get<SinglePartnerResponse>(`/partner/${partnerId}`);
  }

  static createPartner(data: CreatePartnerRequest) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("partnerUrl", data.partnerUrl);
    formData.append("logo", data.logo);

    return axiosInstance.post<SinglePartnerResponse>("/partner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static updatePartner(partnerId: string, data: UpdatePartnerRequest) {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.address) formData.append("address", data.address);
    if (data.description) formData.append("description", data.description);
    if (data.partnerUrl) formData.append("partnerUrl", data.partnerUrl);
    if (data.logo) formData.append("logo", data.logo);

    return axiosInstance.put<SinglePartnerResponse>(`/partner/${partnerId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static deletePartner(partnerId: string) {
    return axiosInstance.delete<SinglePartnerResponse>(`/partner/${partnerId}`);
  }
}
