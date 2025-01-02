import { IApiResponse } from '../../../utils/helper/interface/responseInterface';
import { IUser } from '../../User/interface/userInterface';

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
}

export enum IRole {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  END_USER = 'enduser',
}

export type AuthResponse = Promise<IApiResponse<IUserData>>;

interface ILoginData {
  token: string;
  user: IUser;
}

export type LoginResponse = Promise<IApiResponse<ILoginData>>;
