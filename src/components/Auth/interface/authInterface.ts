import { IApiResponse } from '../../../utils/helper/interface/responseInterface';
import { IUser } from '../../User/Profile/interface/userInterface';

export interface IAuthPayload {
  readonly first_name: string;
  readonly last_name: string;
  readonly profile_image: string;
  readonly email: string;
  readonly password: string;
  readonly phone_number: string;
  readonly role: string;
  readonly date_of_birth: string;
  readonly gender: string;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly created_by: string;
  readonly last_modified_by: string;
}

export interface ILoginPayload {
  readonly email: string;
  readonly password: string;
}

// Interface for user data including hashed password
export interface IUserData {
  readonly user_id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly profile_image: string;
  readonly email: string;
  readonly password: string;
  readonly phone_number: string;
  readonly role: string;
  readonly date_of_birth: string;
  readonly gender: string;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly created_by: string;
  readonly last_modified_by: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly reset_password_token: string;
  readonly reset_password_expires: Date;
}

export enum Role {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  END_USER = 'enduser'
}

export type AuthResponse = Promise<IApiResponse<IUserData>>;

interface ILoginData {
  token: string;
  user: IUser;
}

export type LoginResponse = Promise<IApiResponse<ILoginData>>;

export interface IDoctorPayload {
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
  medical_license_number: string;
  specialization_id: string;
  qualification: string;
  year_of_experience: number;
  consultation_fee: number;
  average_rating?: number;
  total_reviews?: number;
  clinic_address: string;
  city: string;
  state: string;
  country: string;
}

export interface IDoctorMetaData {
  user_metadata_id: string;
  medical_license_number: string;
  specialization_id: string;
  qualification: string;
  year_of_experience: number;
  consultation_fee: number;
  average_rating?: number;
  total_reviews?: number;
  clinic_address: string;
  city: string;
  state: string;
  country: string;
  user_id: string;
  created_by: string;
  last_modified_by: string;
  created_at: Date;
  updated_at: Date;
}
