/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IEmailRepository from '@modules/emails/repositories/IEmailRepository';
import ICreateEmailDTO from '@modules/emails/dtos/ICreateEmailDTO';

import Email from '../entities/Email';

class EmailRepository implements IEmailRepository {
  private ormRepository: Repository<Email>;

  constructor() {
    this.ormRepository = getRepository(Email);
  }

  public async findBySubject(subject: string): Promise<Email | undefined> {
    const email = await this.ormRepository.findOne(subject);

    return email;
  }

  public async findByEmailTo(emailTo: string): Promise<Email | undefined> {
    const email = await this.ormRepository.findOne({
      where: { email_to: emailTo },
    });

    return email;
  }

  public async findByIdPessoa(pessoa_id: string): Promise<Email | undefined> {
    const email = await this.ormRepository.findOne(pessoa_id);

    return email;
  }

  public async create({
    pessoa_id,
    subject,
    message_text,
    message_html,
    email_from,
    email_to,
    attachments,
    email_send,
  }: ICreateEmailDTO): Promise<Email> {
    const email = this.ormRepository.create({
      pessoa_id,
      subject,
      message_text,
      message_html,
      email_from,
      email_to,
      attachments,
      email_send,
    });

    await this.ormRepository.save(email);

    return email;
  }

  public async save(email: Email): Promise<Email> {
    return this.ormRepository.save(email);
  }
}

export default EmailRepository;
