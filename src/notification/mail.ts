import * as ejs from 'ejs';
import nodemailer from 'nodemailer';
import { join } from 'path';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constant/message';
import { logger } from '../utils/logger';
import { IEmailData } from './interface/emailInterface';

class Email {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendEmailWithTemplate(emailData: IEmailData, templatePath: string, options?: ejs.Options) {
    const ejsPath = join(__dirname, `../notification/templates/${templatePath}`);

    try {
      // Render EJS template
      const template = await ejs.renderFile(ejsPath, { ...emailData, ...options });

      logger.info(__filename, '', '', SUCCESS_MESSAGE.SEND_EMAIL_WITH_TEMPLATE_SUCCESS, {
        email: emailData.email,
        subject: emailData.subject,
        templatePath
      });

      // Send email with SMTP
      return this.sendEmail({ ...emailData, template, ...options });
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SEND_EMAIL_WITH_TEMPLATE_FAILURE, {
        templatePath,
        email: emailData.email,
        error: error.message
      });
      throw new Error(`${ERROR_MESSAGE.SEND_EMAIL_WITH_TEMPLATE_FAILURE}: ${error.message}`);
    }
  }

  async sendEmail(sendEmailData: IEmailData) {
    try {
      const mailOptions: any = {
        from: process.env.EMAIL_FROM,
        to: sendEmailData.email,
        subject: sendEmailData.subject,
        html: sendEmailData.template,
        attachments: sendEmailData.attachments || []
      };

      const info = await this.transporter.sendMail(mailOptions);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.SEND_EMAIL_SUCCESS, {
        email: sendEmailData.email,
        subject: sendEmailData.subject
      });

      return info;
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SEND_EMAIL_FAILURE, {
        email: sendEmailData.email,
        error: error.message
      });
      throw new Error(`${ERROR_MESSAGE.SEND_EMAIL_FAILURE}: ${error}`);
    }
  }
}

export default new Email();
