import { UserMaster } from '../../../database/models';
import { IApiResponse } from '../../../utils/helper/interface/responseInterface';

export interface IUser {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  email: string;
  phone_number: string;
  role: string;
  date_of_birth: string;
  gender: string;
  isActive: boolean;
  isDeleted: boolean;
  created_by: string;
  last_modified_by: string;
  created_at: Date;
  updated_at: Date;
}

export type UserList = IUser[];

interface IUserList {
  data: UserMaster[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type UserListResponse = Promise<IApiResponse<IUserList>>;

export type UserProfileResponse = Promise<IApiResponse<IUser | null>>;
