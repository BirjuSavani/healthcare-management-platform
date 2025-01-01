import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGE } from '../constant/message';
import { logger } from './logger';

export const convertPlainTextToHash = async (text: string) => {
  try {
    const hash = await bcrypt.hashSync(text, 10);
    return hash;
  } catch (error) {
    logger.error(__filename, '', '', ERROR_MESSAGE.CONVERT_PLAIN_TEXT_TO_HASH, '');
    throw error;
  }
};

export const comparePassword = async (text: string, hash: string) => {
  try {
    const isMatch = await bcrypt.compare(text, hash);
    return isMatch;
  } catch (error) {
    logger.error(__filename, '', '', ERROR_MESSAGE.COMPARE_PASSWORD, '');
    throw error;
  }
};

export const generateToken = (userId: string, role: string) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error(ERROR_MESSAGE.JWT_SECRET_NOT_SET);
    }

    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    logger.error(__filename, '', '', ERROR_MESSAGE.GENERATE_TOKEN, '');
    throw error;
  }
};
