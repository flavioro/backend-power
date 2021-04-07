/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import Email from '../infra/typeorm/entities/Email';
import IEmailRepository from '../repositories/IEmailRepository';

interface IRequest {
  pessoa_id: string;
  subject: string;
  message_text?: string;
  message_html?: string;
  email_from: string;
  email_to: string;
  attachments?: BinaryType;
  email_send: boolean;
}

@injectable()
class CreateEmailService {
  constructor(
    @inject('EmailRepository')
    private emailRepository: IEmailRepository,
  ) {}

  public async execute({
    pessoa_id,
    subject,
    message_text,
    message_html,
    email_from,
    email_to,
    attachments,
    email_send,
  }: IRequest): Promise<Email> {
    const email = this.emailRepository.create({
      pessoa_id,
      subject,
      message_text,
      message_html,
      email_from,
      email_to,
      attachments,
      email_send,
    });
    return email;
  }
}

export default CreateEmailService;
