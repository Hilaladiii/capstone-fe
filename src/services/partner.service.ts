import axios from 'axios';
import { API_BASE_URL } from '../common/constants';

export interface Partner {
  partnerId: string;
  name: string;
  address: string;
  description: string;
  partnerUrl: string;
  logoUrl: string;
  createdAt: string;
}


const PartnersService = {
  getPartners: async (
    page: number, 
    perPage: number, 
    name: string, 
    city: string, 
    token: string 
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/partner`, {
        params: {
          currPage: page,
          dataPerPage: perPage,
          orderBy: 'desc',
          name,
          city,
        },
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching partners:', error);
      return { partner: [], totalCount: 0, totalPage: 0 };
    }
  },
};

export default PartnersService;