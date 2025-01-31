import { UserMaster } from '../../../../database/models';
import { IApiResponse } from '../../../../utils/helper/interface/responseInterface';
import { IUserData } from '../../../Auth/interface/authInterface';
import { IUser } from '../../../User/Profile/interface/userInterface';

interface IUserList {
  data: UserMaster[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type UserListResponse = Promise<IApiResponse<IUserList>>;

export type UserResponse = Promise<IApiResponse<IUser | null>>;

export interface IUpdateUserPayload {
  first_name: string;
  last_name: string;
  profile_image: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
  date_of_birth: string;
  gender: string;
  isActive: boolean;
  isDeleted: boolean;
  created_by: string;
  last_modified_by: string;
}

export type UpdateUserResponse = Promise<IApiResponse<IUserData | null>>;
