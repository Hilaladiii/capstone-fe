export interface Partner {
  partnerId: string;
  email?: string;
  name: string;
  address: string;
  description: string;
  partnerUrl: string;
  logoUrl: string;
  createdAt: string;
}

export interface PartnerResponse {
  statusCode: number;
  message: string;
  data: {
    partner: Partner[];
    totalCount: number;
    totalPage: number;
  };
}

export interface SinglePartnerResponse {
  statusCode: number;
  message: string;
  data: Partner;
}

export interface CreatePartnerRequest {
  name: string;
  address: string;
  description: string;
  partnerUrl: string;
  logo: File; 
}

export interface UpdatePartnerRequest {
  name?: string;
  address?: string;
  description?: string;
  partnerUrl?: string;
  logo?: File; 
}
