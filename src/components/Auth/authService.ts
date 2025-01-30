import { Op, Transaction } from 'sequelize';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constant/message';
import { UserMaster, UserMetaData } from '../../database/models';
import mail from '../../notification/mail';
import { logger } from '../../utils/logger';
import { IAuthPayload, IDoctorMetaData, IDoctorPayload, IRole, IUserData } from './interface/authInterface';

class AuthService {
  /**
   * General method to find a user by a given condition.
   * @param condition - The query condition.
   * @returns The user data or null if not found.
   */
  private async findUser(condition: object): Promise<IUserData | null> {
    try {
      const user = await UserMaster.findOne(condition);

      // Use `.get()` to extract the raw object, and cast it to `IUserData`.
      return user ? (user.get({ plain: true }) as IUserData) : null;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_USER_FAILURE, { condition, error });
      throw new Error(`${ERROR_MESSAGE.FIND_USER_FAILURE}: ${error}`);
    }
  }

  /**
   * Find a user by email.
   * @param email - The user's email address.
   * @returns The user data or null if not found.
   */
  async findByEmail(email: string): Promise<IUserData | null> {
    try {
      return await this.findUser({ where: { email } });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE}: ${error}`);
    }
  }

  /**
   * Find a user by phone number.
   * @param phone_number - The user's phone number.
   * @returns The user data or null if not found.
   */
  async findByPhoneNumber(phone_number: string): Promise<IUserData | null> {
    try {
      return await this.findUser({ where: { phone_number } });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_BY_PHONE_NUMBER_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_BY_PHONE_NUMBER_FAILURE}: ${error}`);
    }
  }

  /**
   * Find a user by ID.
   * @param id - The user's ID.
   * @returns The user data or null if not found.
   */
  async findById(id: string): Promise<IUserData | null> {
    try {
      return await this.findUser({ where: { user_id: id } });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_USER_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_USER_FAILURE}: ${error}`);
    }
  }

  /**
   * Create a new user.
   * @param payload - The user data payload.
   * @param hashPassword - The hashed password.
   * @param userId - Current user ID performing the action.
   * @returns The created user data.
   */
  async signup(payload: IAuthPayload, hashPassword: string, userId?: string): Promise<IUserData> {
    try {
      // Check if the user is an end user
      const isEndUser = !userId;

      // Create the user
      const user = await UserMaster.create({
        ...payload,
        password: hashPassword,
        role: isEndUser ? IRole.END_USER : payload.role,
        isActive: true,
        isDeleted: false,
        created_by: userId ?? null,
        last_modified_by: userId ?? null,
      });

      // Get the user data
      const userData = user.get({ plain: true }) as IUserData;

      // Update the `created_by` and `last_modified_by` fields
      if (isEndUser && !userData.created_by && !userData.last_modified_by) {
        return await this.updateCreateBy(userData.user_id);
      }

      return userData;
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SIGNUP_FAILURE, { payload, error });
      throw new Error(`${ERROR_MESSAGE.SIGNUP_FAILURE}: ${error}`);
    }
  }

  /**
   * Update the `created_by` and `last_modified_by` fields for a user.
   * @param userId - The user ID to update.
   * @returns The updated user data.
   */
  private async updateCreateBy(userId: string, transaction?: Transaction) {
    try {
      // Update the `created_by` and `last_modified_by` fields
      const user = await UserMaster.update(
        { created_by: userId, last_modified_by: userId },
        {
          where: {
            user_id: userId,
          },
          returning: true,
          transaction,
        }
      );
      return user[1][0].get({ plain: true }) as IUserData;
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE, { userId, error });
      throw new Error(`${ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE}: ${error}`);
    }
  }

  /**
   * Update the `created_by` and `last_modified_by` fields for a user.
   * @param userId - The user ID to update.
   * @returns The updated user data.
   */
  private async updateCreateByUserMetaDta(userId: string, transaction?: Transaction) {
    try {
      // Update the `created_by` and `last_modified_by` fields
      const user = await UserMetaData.update(
        { created_by: userId, last_modified_by: userId },
        {
          where: {
            user_id: userId,
          },
          returning: true,
          transaction,
        }
      );
      return user[1][0].get({ plain: true }) as IUserData;
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE, { userId, error });
      throw new Error(`${ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE}: ${error}`);
    }
  }

  /**
   * Create a new doctor and their metadata.
   * @param doctorPayload - Doctor's data payload.
   * @param hashPassword - The hashed password.
   * @param userId - Current user ID performing the action.
   */
  async doctorSignup(doctorPayload: IDoctorPayload, hashPassword: string, userId?: string): Promise<IDoctorMetaData> {
    const transaction = await UserMaster.sequelize?.transaction();
    if (!transaction) throw new Error('Transaction initialization failed.');

    try {
      // Create UserMaster record
      const user = await UserMaster.create(
        {
          first_name: doctorPayload.first_name,
          last_name: doctorPayload.last_name,
          profile_image: doctorPayload.profile_image,
          email: doctorPayload.email,
          phone_number: doctorPayload.phone_number,
          date_of_birth: doctorPayload.date_of_birth,
          gender: doctorPayload.gender,
          password: hashPassword,
          role: IRole.DOCTOR,
          isActive: true,
          isDeleted: false,
          created_by: userId ?? null,
          last_modified_by: userId ?? null,
        },
        { transaction }
      );

      const userData = user.get({ plain: true }) as IUserData;

      // Update created_by and last_modified_by if they are null
      if (!userData.created_by && !userData.last_modified_by) {
        await this.updateCreateBy(userData.user_id, transaction);
      }

      // Create UserMetaData record
      const doctor = await UserMetaData.create(
        {
          medical_license_number: doctorPayload.medical_license_number,
          specialization_id: doctorPayload.specialization_id,
          qualification: doctorPayload.qualification,
          year_of_experience: doctorPayload.year_of_experience,
          consultation_fee: doctorPayload.consultation_fee,
          average_rating: doctorPayload.average_rating,
          total_reviews: doctorPayload.total_reviews,
          clinic_address: doctorPayload.clinic_address,
          city: doctorPayload.city,
          state: doctorPayload.state,
          country: doctorPayload.country,
          user_id: userData.user_id,
          created_by: userId ?? null,
          last_modified_by: userId ?? null,
        },
        { transaction }
      );

      // Update created_by and last_modified_by if they are null
      if (!userData.created_by && !userData.last_modified_by) {
        await this.updateCreateByUserMetaDta(userData.user_id, transaction);
      }

      // Commit transaction
      await transaction.commit();

      return doctor.get({ plain: true });
    } catch (error) {
      if (transaction) await transaction.rollback();
      logger.error(__filename, '', '', ERROR_MESSAGE.DOCTOR_SIGNUP_FAILURE, { error });
      throw new Error(`${ERROR_MESSAGE.DOCTOR_SIGNUP_FAILURE}: ${error}`);
    }
  }

  /**
   * Update the reset token for a user.
   * @param userId
   * @param resetToken
   * @param resetTokenExpiry
   */
  async updateUserResetToken(userId: string, resetToken: string, resetTokenExpiry: Date): Promise<void> {
    try {
      await UserMaster.update(
        { reset_password_token: resetToken, reset_password_expires: resetTokenExpiry },
        { where: { user_id: userId } }
      );
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FORGET_PASSWORD, { userId, error });
      throw new Error(`${ERROR_MESSAGE.FORGET_PASSWORD}: ${error}`);
    }
  }

  /**
   * Find a user by token.
   * @param token - The user's token.
   * @returns The user data or null if not found.
   */
  async findByResetToken(token: string): Promise<IUserData | null> {
    try {
      return await this.findUser({
        where: { reset_password_token: token, reset_password_expires: { [Op.gt]: new Date() } },
      });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE}: ${error}`);
    }
  }

  /**
   * Update the password for a user.
   * @param userId - The user's ID.
   * @param password - The new password.
   */
  async updateUserPassword(userId: string, password: string): Promise<void> {
    try {
      await UserMaster.update(
        { password: password, reset_password_token: null, reset_password_expires: null },
        { where: { user_id: userId } }
      );
      return;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_PASSWORD_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.UPDATE_PASSWORD_FAILURE}: ${error}`);
    }
  }

  /**
   * Send a welcome email to a new user.
   * @param authData 
   */
  async sendWelcomeEmailWithTemplate(authData: IUserData): Promise<void> {
    try {
      await mail.sendEmailWithTemplate(
        {
          logo: `${process.env.BACKEND_URL}/public/images/doctor-logo-49379.png`,
          firstName: authData.first_name,
          lastName: authData.last_name,
          email: authData.email,
          subject: SUCCESS_MESSAGE.SEND_WELCOME_EMAIL_SUCCESS,
        },
        'welcome-email.ejs'
      );
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SEND_WELCOME_EMAIL_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.SEND_WELCOME_EMAIL_FAILURE}: ${error}`);
    }
  }

  /**
   * Send a reset password email to a user.
   * @param authData 
   * @param resetToken 
   */
  async sendResetPasswordEmailWithTemplate(authData: IUserData, resetToken: string): Promise<void> {
    try {
      await mail.sendEmailWithTemplate(
        {
          logo: `${process.env.BACKEND_URL}/public/images/doctor-logo-49379.png`,
          firstName: authData.first_name,
          lastName: authData.last_name,
          email: authData.email,
          redirectUrl: `${process.env.BACKEND_URL}/api/auth/reset-password?token=${resetToken}`,
          subject: SUCCESS_MESSAGE.SEND_RESET_PASSWORD_EMAIL_SUCCESS,
        },
        'reset-password-email.ejs'
      );
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SEND_RESET_PASSWORD_EMAIL_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.SEND_RESET_PASSWORD_EMAIL_FAILURE}: ${error}`);
    }
  }

  /**
   * Send a password set email to a user.
   * @param authData 
   */
  async sendPasswordSetEmailWithTemplate(authData: IUserData): Promise<void> {
    try {
      await mail.sendEmailWithTemplate(
        {
          logo: `${process.env.BACKEND_URL}/public/images/doctor-logo-49379.png`,
          firstName: authData.first_name,
          lastName: authData.last_name,
          email: authData.email,
          redirectUrl: `${process.env.BACKEND_URL}/api/auth/login`,
          subject: SUCCESS_MESSAGE.SEND_PASSWORD_SET_EMAIL_SUCCESS,
        },
        'password-set-email.ejs'
      );
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SEND_PASSWORD_SET_EMAIL_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.SEND_PASSWORD_SET_EMAIL_FAILURE}: ${error}`);
    }
  }
}

export default new AuthService();
