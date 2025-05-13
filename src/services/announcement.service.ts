import axios from 'axios';
import { API_BASE_URL } from '../common/constants';

export interface Announcement {
  announcementId: string;
  title: string;
  createdAt: string; 
  content: string; 
}

const AnnouncementsService = {
  getAnnouncements: async (token: string, page: number, perPage: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/announcement`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          currPage: page,
          dataPerPage: perPage,
          orderBy: 'asc',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return { data: [], totalPage: 0 };
    }
  },

  getSingleAnnouncement: async (token: string, announcementId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/announcement/${announcementId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching single announcement:', error);
      return { data: {} };
    }
  },
};

export default AnnouncementsService;
