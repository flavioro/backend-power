import { getRepository, Repository } from 'typeorm';

import IContasReceberRepository from '@modules/contasReceber/repositories/IContasReceberRepository';
import ICreateContasReceberDTO from '@modules/contasReceber/dtos/ICreateContasReceberDTO';

import ContasReceber from '../entities/ContasReceber';

class ContasReceberRepository implements IContasReceberRepository {
  private ormRepository: Repository<ContasReceber>;

  constructor() {
    this.ormRepository = getRepository(ContasReceber);
  }

  public async findByName(name: string): Promise<ContasReceber | undefined> {
    const contasReceber = await this.ormRepository.findOne({
      where: { name },
    });

    return contasReceber;
  }

  public async findById(id: string): Promise<ContasReceber | undefined> {
    const contasReceber = await this.ormRepository.findOne(id);

    return contasReceber;
  }

  public async create({
    pessoa_id,
    operadora_id,
    total_itens,
    dt_venda,
    vl_total_original,
    dt_receber,
    vl_receber,
    vl_parcela,
    vl_taxa,
    vl_desconto,
    vl_extra,
    tarifa_intermediacao,
    taxa_intermediacao,
    taxa_parcelamento_cartao,
    origem,
    tipo_recebimento,
    referencia,
    status,
    protocolo,
    link_pag,
  }: ICreateContasReceberDTO): Promise<ContasReceber> {
    const contasReceber = this.ormRepository.create({
      pessoa_id,
      operadora_id,
      total_itens,
      dt_venda,
      vl_total_original,
      dt_receber,
      vl_receber,
      vl_parcela,
      vl_taxa,
      vl_desconto,
      vl_extra,
      tarifa_intermediacao,
      taxa_intermediacao,
      taxa_parcelamento_cartao,
      origem,
      tipo_recebimento,
      referencia,
      status,
      protocolo,
      link_pag,
    });

    await this.ormRepository.save(contasReceber);

    return contasReceber;
  }

  public async save(contasReceber: ContasReceber): Promise<ContasReceber> {
    return this.ormRepository.save(contasReceber);
  }
}

export default ContasReceberRepository;
