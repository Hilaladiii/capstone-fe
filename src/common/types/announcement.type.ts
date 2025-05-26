export interface Announcement {
  announcementId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  imageUrl: string | null;
  fileUrl: string | null;
}

export interface AnnouncementResponse {
  announcements: Announcement[];
  totalCount: number;
  totalPage: number;
}

export interface SingleAnnouncementResponse {
  statusCode: number;
  message: string;
  data: Announcement;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  file: File;
  image: File;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
  file?: File;
  image?: File;
}
