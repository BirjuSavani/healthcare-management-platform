import { Buffer } from 'buffer';
export interface IEmailData {
  firstName?: string;
  lastName?: string;
  email?: string;
  userEmail?: string;
  password?: string;
  userName?: string;
  contact_email?: string;
  query?: string;
  subject?: string;
  text?: string;
  template?: string;
  from?: string;
  to?: string;
  html?: string | Buffer;
  redirectUrl?: string;
  receiptUrl?: string;
  bannerImageUrl?: string;
  footerImageUrl?: string;
  logo?: string;
  topic?: string; // used for contact us email
  data?: { receiverEmail: string };
  attachments?: {
    content: Buffer;
    filename: string;
    encoding: string;
  };
  verificationUrl?: string;
}
