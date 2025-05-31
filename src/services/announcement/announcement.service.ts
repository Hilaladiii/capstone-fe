import axiosInstance from "../setup.service";
import {
  AnnouncementResponse,
  SingleAnnouncementResponse,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from "../../common/types/announcement.type";

export class AnnouncementService {
  static async getAllAnnouncements(
    currPage: number,
    dataPerPage: number,
    orderBy: string,
    title: string = ""
  ): Promise<AnnouncementResponse> {
    const response = await axiosInstance.get("/announcement", {
      params: {
        currPage,
        dataPerPage,
        orderBy,
        title,
      },
    });
    return response.data.data;
  }

  static async getSingleAnnouncement(announcementId: string): Promise<SingleAnnouncementResponse> {
    const response = await axiosInstance.get(`/announcement/${announcementId}`);
    return response.data;
  }

  static async createAnnouncement(data: CreateAnnouncementRequest): Promise<SingleAnnouncementResponse> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("file", data.file);
    formData.append("image", data.image);

    const response = await axiosInstance.post("/announcement", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async updateAnnouncement(
    announcementId: string,
    data: UpdateAnnouncementRequest
  ): Promise<SingleAnnouncementResponse> {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.content) formData.append("content", data.content);
    if (data.file) formData.append("file", data.file);
    if (data.image) formData.append("image", data.image);

    const response = await axiosInstance.put(`/announcement/${announcementId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async deleteAnnouncement(announcementId: string): Promise<SingleAnnouncementResponse> {
    const response = await axiosInstance.delete(`/announcement/${announcementId}`);
    return response.data;
  }
}
