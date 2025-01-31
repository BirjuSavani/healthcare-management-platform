import { Specialization } from '../../../../database/models';
import { IApiResponse } from '../../../../utils/helper/interface/responseInterface';

export interface ISpecializationPayload {
  specialization_name: string;
  description: string;
}

export interface ISpecialization {
  specialization_id: string;
  specialization_name: string;
  description: string;
  created_by: string;
  last_modified_by: string;
  created_at: Date;
  updated_at: Date;
}

export type SpecializationResponse = Promise<IApiResponse<ISpecialization | null>>;

interface ISpecializationList {
  data: Specialization[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type SpecializationListResponse = Promise<IApiResponse<ISpecializationList | null>>;
