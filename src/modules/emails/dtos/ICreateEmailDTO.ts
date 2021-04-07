/* eslint-disable camelcase */
export default interface ICreateEmailDTO {
  pessoa_id: string;
  subject: string;
  message_text?: string;
  message_html?: string;
  email_from: string;
  email_to: string;
  attachments?: BinaryType;
  email_send: boolean;
};
