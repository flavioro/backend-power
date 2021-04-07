import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import ContasReceber from '../infra/typeorm/entities/ContasReceber';
import IContasReceberRepository from '../repositories/IContasReceberRepository';

interface IRequest {
  pessoa_id: string;

  operadora_id: string;

  total_itens: number;

  total_parcelas: number;

  dt_venda: Date;

  vl_total_original: number;

  dt_receber?: Date;

  vl_receber?: number;

  vl_parcela?: number;

  vl_taxa?: number;

  vl_desconto?: number;

  vl_extra?: number;

  tarifa_intermediacao?: number;

  taxa_intermediacao?: number;

  taxa_parcelamento_cartao?: number;

  origem: string;

  tipo_recebimento: string;

  referencia: string;

  status: string;

  protocolo?: string;

  link_pag?: string;
}

@injectable()
class CreateContasReceberService {
  constructor(
    @inject('ContasReceberRepository')
    private contasReceberRepository: IContasReceberRepository,
  ) {}

  public async execute({
    pessoa_id,
    operadora_id,
    total_itens,
    total_parcelas,
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
  }: IRequest): Promise<ContasReceber> {
    const contasReceberCreate = this.contasReceberRepository.create({
      pessoa_id,
      operadora_id,
      total_itens,
      total_parcelas,
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
      origem,
      tipo_recebimento,
      referencia,
      status,
      protocolo,
      link_pag,
    });

    return contasReceberCreate;
  }
}

export default CreateContasReceberService;
