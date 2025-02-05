import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, GLOBAL_MESSAGE, SUCCESS_MESSAGE } from '../../../constant/message';
import { ICustomRequest } from '../../../middleware/authMiddleware';
import { ResponseHandler } from '../../../utils/helper';
import { IApiResponse } from '../../../utils/helper/interface/responseInterface';
import { logger } from '../../../utils/logger';
import { ISpecializationPayload, SpecializationListResponse, SpecializationResponse } from './interface/specializationInterface';
import specializationService from './specializationService';

class SpecializationController {
  /**
   * Create a new specialization
   * @param req Request object
   * @param res Response object
   * @returns ISpecializationResponse
   */
  async createSpecialization(req: Request, res: Response): SpecializationResponse {
    const { userId } = req as ICustomRequest;

    try {
      const payload: ISpecializationPayload = req.body;

      // Check for existing specialization
      const existingSpecialization = await specializationService.getSpecializationByName(payload.specialization_name);

      // Throw error if specialization already exists
      if (existingSpecialization) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.SPECIALIZATION_ALREADY_EXISTS, payload.specialization_name);
        return ResponseHandler.error(res, httpStatus.CONFLICT, false, ERROR_MESSAGE.SPECIALIZATION_ALREADY_EXISTS, null);
      }

      // Create specialization
      const specialization = await specializationService.createSpecialization(payload, userId);

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.CREATE_SPECIALIZATION, specialization.specialization_id);

      return ResponseHandler.success(res, httpStatus.CREATED, true, SUCCESS_MESSAGE.CREATE_SPECIALIZATION, specialization);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.CREATE_SPECIALIZATION, error);
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get all specializations
   * @param req Request object
   * @param res Response object
   * @returns ISpecializationResponse
   */
  async getAllSpecializations(req: Request, res: Response): SpecializationListResponse {
    try {
      // Fetch all specializations
      const specializations = await specializationService.getAllSpecializations(req);

      if (!specializations) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.NO_SPECIALIZATIONS_FOUND, '');
        return ResponseHandler.error(res, httpStatus.OK, false, ERROR_MESSAGE.NO_SPECIALIZATIONS_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.GET_ALL_SPECIALIZATIONS, '');

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_ALL_SPECIALIZATIONS, specializations);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_ALL_SPECIALIZATIONS, error);
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Update a specialization
   * @param req Request object
   * @param res Response object
   * @returns ISpecializationResponse
   */
  async updateSpecialization(req: Request, res: Response): SpecializationResponse {
    const { userId } = req as ICustomRequest;
    const specializationId = req.params.id;

    try {
      const payload: ISpecializationPayload = req.body;

      // Fetch the specialization by ID
      const specialization = await specializationService.getSpecializationById(specializationId);

      if (!specialization) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, { specializationId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, null);
      }

      // Update the specialization
      const updatedSpecialization = await specializationService.updateSpecialization(specializationId, payload, userId);

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.UPDATE_SPECIALIZATION, updatedSpecialization.specialization_id);

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.UPDATE_SPECIALIZATION, updatedSpecialization);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.UPDATE_SPECIALIZATION, { specializationId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Get a specialization by ID
   * @param req Request object
   * @param res Response object
   * @returns ISpecializationResponse
   */
  async getSpecializationById(req: Request, res: Response): SpecializationResponse {
    const specializationId = req.params.id;

    try {
      // Fetch the specialization by ID
      const specialization = await specializationService.getSpecializationById(specializationId);

      if (!specialization) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, '');
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.GET_SPECIALIZATION_BY_ID, specialization.specialization_id);

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_SPECIALIZATION_BY_ID, specialization);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_SPECIALIZATION_BY_ID, { specializationId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Delete a specialization by ID
   * @param req Request object
   * @param res Response object
   * @returns IApiResponse
   */
  async deleteSpecialization(req: Request, res: Response): Promise<IApiResponse> {
    const specializationId = req.params.id;

    try {
      // Delete the specialization by ID
      const deletedSpecialization = await specializationService.deleteSpecialization(specializationId);

      if (!deletedSpecialization) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, { specializationId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.DELETE_SPECIALIZATION, deletedSpecialization.specialization_id);

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.DELETE_SPECIALIZATION, null);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.DELETE_SPECIALIZATION, { specializationId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }
}

export default new SpecializationController();
