import { Request } from 'express';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../constant/message';
import { Specialization, UserMaster, UserMetaData } from '../../database/models';
import { paginate } from '../../utils/helper/paginationHelper';
import { logger } from '../../utils/logger';
import { IDoctorPayload, Role } from '../Auth/interface/authInterface';
import { IDoctorUpdateResponse } from './interface/doctorInterface';

class DoctorService {
  /**
   * Fetch all doctors with pagination and optional filters.
   * @param req - Express Request object
   * @returns Paginated list of doctors
   */
  async getAllDoctors(req: Request): Promise<any> {
    const {
      filter,
      page = 1,
      limit = 10
    } = req.query as {
      filter?: string;
      page?: string;
      limit?: string;
    };

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    try {
      // Build where clause for filtering
      const whereClause = {
        isDeleted: false,
        role: Role.DOCTOR,
        ...(filter && {
          [Op.or]: [{ first_name: { [Op.like]: `%${filter}%` } }, { last_name: { [Op.like]: `%${filter}%` } }, { email: { [Op.like]: `%${filter}%` } }]
        })
      };

      // Fetch doctors with pagination
      const userResult = await UserMetaData.findAndCountAll({
        include: [
          {
            model: Specialization,
            as: 'specialization'
          },
          {
            model: UserMaster,
            as: 'user',
            where: whereClause,
            attributes: { exclude: ['password'] },
            include: [
              { model: UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
              { model: UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
            ]
          }
        ],
        order: [['created_at', 'DESC']],
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize,
        nest: true
      });

      return paginate(userResult.count, userResult.rows, { page: pageNumber, limit: pageSize });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_ALL_DOCTORS, error);
      throw new Error(`${ERROR_MESSAGE.GET_ALL_DOCTORS}: ${error}`);
    }
  }

  /**
   * Fetch a doctor by ID.
   * @param doctorId - ID of the doctor to fetch
   * @returns The doctor object
   */
  async getDoctorById(doctorId: string): Promise<any> {
    try {
      const doctor = await UserMetaData.findOne({
        include: [
          {
            model: Specialization,
            as: 'specialization'
          },
          {
            model: UserMaster,
            as: 'user',
            attributes: { exclude: ['password'] },
            include: [
              { model: UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
              { model: UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
            ],
            where: { isDeleted: false }
          }
        ],
        where: { user_id: doctorId },
        nest: true
      });

      const doctorData = doctor?.get({ plain: true });
      if (!doctorData) {
        logger.warn(__filename, '', '', ERROR_MESSAGE.DOCTOR_NOT_FOUND, { doctorId });
        throw new Error(`${ERROR_MESSAGE.DOCTOR_NOT_FOUND}: ${doctorId}`);
      }

      const { user, specialization, ...metadata } = doctorData;

      // const doctorDetails = { user: { ...user }, user_metadata: { ...rest }, specialization: { ...specialization } };

      return {
        user,
        user_metadata: metadata,
        specialization
      };
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_DOCTOR_BY_ID, error);
      throw new Error(`${ERROR_MESSAGE.GET_DOCTOR_BY_ID}: ${error}`);
    }
  }

  /**
   * Update doctor information.
   * @param doctorId - Doctor's ID
   * @param payload - Update payload
   * @param userId - ID of the user performing the update
   * @returns Updated doctor and metadata
   */
  async updateDoctor(doctorId: string, payload: IDoctorPayload, userId: string): Promise<IDoctorUpdateResponse> {
    const transaction = await UserMaster.sequelize?.transaction();
    if (!transaction) throw new Error('Transaction initialization failed.');

    try {
      // Update UserMaster record
      const [updateCount, updatedDoctors] = await UserMaster.update(
        {
          first_name: payload.first_name,
          last_name: payload.last_name,
          profile_image: payload.profile_image,
          email: payload.email,
          phone_number: payload.phone_number,
          date_of_birth: payload.date_of_birth,
          gender: payload.gender,
          isActive: payload.isActive,
          last_modified_by: userId
        },
        {
          where: { user_id: doctorId },
          returning: true,
          transaction
        }
      );

      if (updateCount === 0) {
        throw new Error(`${ERROR_MESSAGE.DOCTOR_NOT_FOUND} : ${doctorId}`);
      }

      // Update UserMetaData record
      const [metaUpdateCount, updatedMetaRecords] = await UserMetaData.update(
        {
          medical_license_number: payload.medical_license_number,
          specialization_id: payload.specialization_id,
          qualification: payload.qualification,
          year_of_experience: payload.year_of_experience,
          consultation_fee: payload.consultation_fee,
          average_rating: payload.average_rating,
          total_reviews: payload.total_reviews,
          clinic_address: payload.clinic_address,
          city: payload.city,
          state: payload.state,
          country: payload.country,
          last_modified_by: userId
        },
        {
          where: { user_id: doctorId },
          returning: true,
          transaction
        }
      );

      if (metaUpdateCount === 0) {
        throw new Error(`${ERROR_MESSAGE.DOCTOR_NOT_FOUND} : ${doctorId}`);
      }

      // Commit transaction
      await transaction.commit();

      return {
        user: updatedDoctors[0].get({ plain: true }),
        meta: updatedMetaRecords[0].get({ plain: true })
      } as IDoctorUpdateResponse;
    } catch (error) {
      // Rollback transaction on error
      if (transaction) await transaction.rollback();
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_DOCTOR, error);
      throw new Error(`${ERROR_MESSAGE.UPDATE_DOCTOR}: ${error}`);
    }
  }
}

export default new DoctorService();
