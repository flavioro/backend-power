import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContasReceberService from '@modules/contasReceber/services/CreateContasReceberService';

export default class ContasReceberController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createContasReceberService = container.resolve(
      CreateContasReceberService,
    );

    const contasReceber = await createContasReceberService.execute({
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
    });

    return response.json(contasReceber);
  }
}
