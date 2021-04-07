/* eslint-disable camelcase */
import Email from '../infra/typeorm/entities/Email';
import ICreateEmailDTO from '../dtos/ICreateEmailDTO';

export default interface IEmailRepository {
  findByIdPessoa(pessoa_id: string): Promise<Email | undefined>;
  findBySubject(subject: string): Promise<Email | undefined>;
  findByEmailTo(emailTo: string): Promise<Email | undefined>;
  create(data: ICreateEmailDTO): Promise<Email>;
  save(email: Email): Promise<Email>;
};
