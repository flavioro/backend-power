/* eslint-disable camelcase */
// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import SiteContato from '../infra/typeorm/entities/SiteContato';
import ISiteContatoRepository from '../repositories/ISiteContatoRepository';

interface IRequest {
  pessoa_id: string;
  subject: string;
  message: string;
}

@injectable()
class CreateSiteContatoService {
  constructor(
    @inject('SiteContactsRepository')
    private siteContatoRepository: ISiteContatoRepository,
  ) {}

  public async execute({
    pessoa_id,
    subject,
    message,
  }: IRequest): Promise<SiteContato> {
    const siteContato = this.siteContatoRepository.create({
      pessoa_id,
      subject,
      message,
    });
    // console.log('CreateSiteContatoService');
    return siteContato;
  }
}

export default CreateSiteContatoService;
