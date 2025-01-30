import { Request } from 'express';
import { ERROR_MESSAGE } from '../../../constant/message';
import { Specialization, UserMaster } from '../../../database/models';
import { paginate } from '../../../utils/helper/paginationHelper';
import { logger } from '../../../utils/logger';
import { ISpecialization, ISpecializationPayload } from './interface/specializationInterface';

class SpecializationService {
  /**
   * Get specialization by name
   * @param name Specialization name
   * @returns ISpecialization | null
   */
  async getSpecializationByName(name: string): Promise<ISpecialization | null> {
    try {
      const specialization = await Specialization.findOne({ where: { specialization_name: name } });
      return specialization ? specialization.get({ plain: true }) : null;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_SPECIALIZATION_BY_NAME, error);
      throw new Error(`${ERROR_MESSAGE.GET_SPECIALIZATION_BY_NAME}: ${error}`);
    }
  }

  /**
   * Create a new specialization
   * @param payload Specialization data
   * @param userId User creating the specialization
   * @returns ISpecialization
   */
  async createSpecialization(payload: ISpecializationPayload, userId: string): Promise<ISpecialization> {
    try {
      const specialization = await Specialization.create({ ...payload, created_by: userId, last_modified_by: userId });
      return specialization.get({ plain: true });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.CREATE_SPECIALIZATION, error);
      throw new Error(`${ERROR_MESSAGE.CREATE_SPECIALIZATION}: ${error}`);
    }
  }

  /**
   * Get all specializations
   * @returns ISpecialization[]
   */
  async getAllSpecializations(req: Request) {
    try {
      const { page = req.query.page || 1, limit = req.query.limit || 10 } = req.query;

      const specializations = await Specialization.findAndCountAll({
        include: [
          { model: UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
          { model: UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] },
        ],
        order: [['created_at', 'DESC']],
        offset: (Number(page) - 1) * Number(limit),
        limit: Number(limit),
      });

      return paginate(specializations.count, specializations.rows, { page: Number(page), limit: Number(limit) });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_ALL_SPECIALIZATIONS, error);
      throw new Error(`${ERROR_MESSAGE.GET_ALL_SPECIALIZATIONS}: ${error}`);
    }
  }

  /**
   * Get specialization by ID
   * @param specializationId Specialization ID
   * @returns ISpecialization | null
   */
  async getSpecializationById(specializationId: string): Promise<ISpecialization | null> {
    try {
      const specialization = await Specialization.findOne({
        where: { specialization_id: specializationId },
        include: [
          { model: UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
          { model: UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] },
        ],
      });
      return specialization ? specialization.get({ plain: true }) : null;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_SPECIALIZATION_BY_ID, error);
      throw new Error(`${ERROR_MESSAGE.GET_SPECIALIZATION_BY_ID}: ${error}`);
    }
  }

  /**
   * Update specialization by ID
   * @param specializationId Specialization ID
   * @param payload Specialization data
   * @param userId User updating the specialization
   * @returns ISpecialization
   */
  async updateSpecialization(
    specializationId: string,
    payload: ISpecializationPayload,
    userId: string
  ): Promise<ISpecialization> {
    try {
      const specialization = await Specialization.findByPk(specializationId);
      if (!specialization) {
        throw new Error(ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND);
      }
      const updatedSpecialization = await specialization.update({ ...payload, last_modified_by: userId });
      return updatedSpecialization.get({ plain: true });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_SPECIALIZATION, error);
      throw new Error(`${ERROR_MESSAGE.UPDATE_SPECIALIZATION}: ${error}`);
    }
  }

  /**
   * Delete specialization by ID
   * @param specializationId Specialization ID
   * @returns ISpecialization
   */
  async deleteSpecialization(specializationId: string): Promise<ISpecialization> {
    try {
      const specialization = await Specialization.findByPk(specializationId);
      if (!specialization) {
        throw new Error(ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND);
      }
      await specialization.destroy();
      return specialization.get({ plain: true });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.DELETE_SPECIALIZATION, error);
      throw new Error(`${ERROR_MESSAGE.DELETE_SPECIALIZATION}: ${error}`);
    }
  }
}

export default new SpecializationService();
