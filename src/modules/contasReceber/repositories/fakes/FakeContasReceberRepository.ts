import { uuid } from 'uuidv4';

import IContasReceberRepository from '@modules/contasReceber/repositories/IContasReceberRepository';
import ICreateContasReceberDTO from '@modules/contasReceber/dtos/ICreateContasReceberDTO';

import ContasReceber from '../../infra/typeorm/entities/ContasReceber';

class ContasReceberRepository implements IContasReceberRepository {
  private contasRecebers: ContasReceber[] = [];

  public async findById(id: string): Promise<ContasReceber | undefined> {
    const findContaReceber = this.contasRecebers.find(
      contaReceber => contaReceber.id === id,
    );

    return findContaReceber;
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
    tipo_recebimento,
    origem,
    referencia,
    status,
    protocolo,
    link_pag,
  }: ICreateContasReceberDTO): Promise<ContasReceber> {
    const contasReceber = new ContasReceber();

    Object.assign(contasReceber, {
      id: uuid(),
      pessoa_id,
      operadora_id,
      total_itens,
      dt_venda,
      vl_total_original,
      dt_receber,
      vl_parcela,
      vl_receber,
      vl_taxa,
      vl_desconto,
      vl_extra,
      tarifa_intermediacao,
      taxa_intermediacao,
      taxa_parcelamento_cartao,
      tipo_recebimento,
      origem,
      referencia,
      status,
      protocolo,
      link_pag,
    });

    this.contasRecebers.push(contasReceber);

    return contasReceber;
  }

  public async save(contasReceber: ContasReceber): Promise<ContasReceber> {
    const findContasReceberIndex = this.contasRecebers.findIndex(
      contasReceberIndex => contasReceberIndex.id === contasReceber.id,
    );

    this.contasRecebers[findContasReceberIndex] = contasReceber;

    return contasReceber;
  }
}

export default ContasReceberRepository;
