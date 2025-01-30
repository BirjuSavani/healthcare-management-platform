import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, GLOBAL_MESSAGE, SUCCESS_MESSAGE } from '../../constant/message';
import { CustomRequest } from '../../middleware/authMiddleware';
import { ResponseHandler } from '../../utils/helper';
import { IApiResponse } from '../../utils/helper/interface/responseInterface';
import { logger } from '../../utils/logger';
import adminService from '../Admin/User/adminService';
import { IDoctorPayload } from '../Auth/interface/authInterface';
import doctorService from './doctorService';
import { UpdateDoctorResponse } from './interface/doctorInterface';

class DoctorController {
  /**
   * Get all doctors
   * @param req
   * @param res
   * @returns UserListResponse
   */
  async getAllDoctors(req: Request, res: Response): Promise<any> {
    try {
      // Fetch all doctors
      const doctors = await doctorService.getAllDoctors(req);

      if (!doctors) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.NO_DOCTORS_FOUND, '');
        return ResponseHandler.error(res, httpStatus.OK, false, ERROR_MESSAGE.NO_DOCTORS_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.GET_ALL_DOCTORS, '');

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_ALL_DOCTORS, doctors);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_ALL_DOCTORS, error);
      return ResponseHandler.error(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        false,
        GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }

  /**
   * Get By Id doctor
   * @param req
   * @param res
   * @returns UserResponse
   */
  async getDoctorById(req: Request, res: Response): Promise<any> {
    const doctorId = req.params.id;
    try {
      // Fetch the doctor by ID
      const doctor = await doctorService.getDoctorById(doctorId);

      if (!doctor) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.DOCTOR_NOT_FOUND, { doctorId });
        return ResponseHandler.error(
          res,
          httpStatus.BAD_REQUEST,
          false,
          ERROR_MESSAGE.DOCTOR_NOT_FOUND,
          ERROR_MESSAGE.DOCTOR_NOT_FOUND
        );
      } else {
        logger.info(__filename, req.method, '', SUCCESS_MESSAGE.GET_DOCTOR_BY_ID, { doctorId });

        return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_DOCTOR_BY_ID, doctor);
      }
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_DOCTOR_BY_ID, { doctorId, error });
      return ResponseHandler.error(res, httpStatus.BAD_REQUEST, false, ERROR_MESSAGE.GET_DOCTOR_BY_ID, error);
    }
  }

  /**
   * Update doctor
   * @param req
   * @param res
   * @returns UpdateDoctorResponse
   */
  async updateDoctorProfile(req: Request, res: Response): UpdateDoctorResponse {
    const { userId } = req as CustomRequest;
    const doctorId = req.params.id;
    try {
      const payload: IDoctorPayload = req.body;

      // Fetch the doctor by ID
      const doctor = await adminService.getUserById(doctorId);

      if (!doctor) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.DOCTOR_NOT_FOUND, { doctorId });
        return ResponseHandler.error(
          res,
          httpStatus.BAD_REQUEST,
          false,
          ERROR_MESSAGE.DOCTOR_NOT_FOUND,
          ERROR_MESSAGE.DOCTOR_NOT_FOUND
        );
      }

      // Update the doctor
      const updatedDoctor = await doctorService.updateDoctor(doctorId, payload, userId);

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.UPDATE_DOCTOR, { doctorId });

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.UPDATE_DOCTOR, updatedDoctor);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.UPDATE_DOCTOR, { doctorId, error });
      return ResponseHandler.error(res, httpStatus.BAD_REQUEST, false, ERROR_MESSAGE.UPDATE_DOCTOR, error);
    }
  }

  /**
   * Delete doctor
   * @param req
   * @param res
   */
  async deleteDoctor(req: Request, res: Response): Promise<IApiResponse> {
    const userId = req.params.id;
    try {
      // Delete the doctor by ID
      const deletedDoctor = await adminService.deleteUser(userId);

      if (!deletedDoctor) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.DOCTOR_NOT_FOUND, { userId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.DOCTOR_NOT_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.DELETE_DOCTOR, { userId });

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.DELETE_DOCTOR, null);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.DELETE_DOCTOR, { userId, error });
      return ResponseHandler.error(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        false,
        GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}

export default new DoctorController();
