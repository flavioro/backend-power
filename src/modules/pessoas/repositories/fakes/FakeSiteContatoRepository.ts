/* eslint-disable camelcase */
import { uuid } from 'uuidv4';
import ISiteContatoRepository from '@modules/pessoas/repositories/ISiteContatoRepository';
import ICreateSiteContatoDTO from '@modules/pessoas/dtos/ICreateSiteContatoDTO';

import SiteContato from '../../infra/typeorm/entities/SiteContato';

class SiteContatoRepository implements ISiteContatoRepository {
  private siteContatos: SiteContato[] = [];

  public async findByIdPessoa(
    pessoa_id: string,
  ): Promise<SiteContato | undefined> {
    const findSiteContato = this.siteContatos.find(
      (siteContato) => siteContato.pessoa_id === pessoa_id,
    );

    return findSiteContato;
  }

  public async create(
    siteContatoData: ICreateSiteContatoDTO,
  ): Promise<SiteContato> {
    const siteContato = new SiteContato();

    Object.assign(siteContato, { id: uuid() }, siteContatoData);

    this.siteContatos.push(siteContato);

    return siteContato;
  }

  public async save(siteContato: SiteContato): Promise<SiteContato> {
    const siteContatoIndex = this.siteContatos.findIndex(
      (siteContatoItem) => siteContatoItem.id === siteContato.id,
    );

    this.siteContatos[siteContatoIndex] = siteContato;

    return siteContato;
  }
}

export default SiteContatoRepository;
