/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import ISiteContatoRepository from '@modules/pessoas/repositories/ISiteContatoRepository';
import ICreateSiteContatoDTO from '@modules/pessoas/dtos/ICreateSiteContatoDTO';

import SiteContato from '../entities/SiteContato';

class SiteContatoRepository implements ISiteContatoRepository {
  private ormRepository: Repository<SiteContato>;

  constructor() {
    this.ormRepository = getRepository(SiteContato);
  }

  public async findByIdPessoa(
    pessoa_id: string,
  ): Promise<SiteContato | undefined> {
    const siteContato = await this.ormRepository.findOne(pessoa_id);

    return siteContato;
  }

  public async create({
    pessoa_id,
    subject,
    message,
  }: ICreateSiteContatoDTO): Promise<SiteContato> {
    const siteContato = this.ormRepository.create({
      pessoa_id,
      subject,
      message,
    });

    await this.ormRepository.save(siteContato);

    return siteContato;
  }

  public async save(siteContato: SiteContato): Promise<SiteContato> {
    return this.ormRepository.save(siteContato);
  }
}

export default SiteContatoRepository;
