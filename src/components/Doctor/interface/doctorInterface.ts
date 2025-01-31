import { IApiResponse } from '../../../utils/helper/interface/responseInterface';
import { IDoctorMetaData, IUserData } from '../../Auth/interface/authInterface';

export interface DoctorUpdateResponse {
  user: IUserData | undefined;
  meta: IDoctorMetaData | undefined;
}

export type UpdateDoctorResponse = Promise<IApiResponse<DoctorUpdateResponse | undefined>>;
