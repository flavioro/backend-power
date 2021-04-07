/* eslint-disable camelcase */
import SiteContato from '../infra/typeorm/entities/SiteContato';
import ICreateSiteContatoDTO from '../dtos/ICreateSiteContatoDTO';

export default interface IPortadorCartaoRepository {
  findByIdPessoa(pessoa_id: string): Promise<SiteContato | undefined>;
  create(data: ICreateSiteContatoDTO): Promise<SiteContato>;
  save(portadorCartao: SiteContato): Promise<SiteContato>;
}
