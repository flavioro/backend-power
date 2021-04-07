import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePortadorCartaoService from '@modules/pessoas/services/CreatePortadorCartaoService';
import GetBrandAndInstallmentCreditCardService from '../../../services/GetBrandAndInstallmentCreditCardService'

export default class SellsPortadorCartaoController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      pessoa_id,
      name,
      email,
      cpf,
      dt_nascimento,
      phone,
      bin,
      vl_total_original,
    } = request.body;

    const createPortadorCartao = container.resolve(CreatePortadorCartaoService);

    const portador_cartao = await createPortadorCartao.execute({
      pessoa_id,
      name,
      email,
      cpf,
      dt_nascimento,
      phone,
    });

    const getInstallmentCreditCardService = new GetBrandAndInstallmentCreditCardService();
    const installments = await getInstallmentCreditCardService.execute({
      bin,
      amount: vl_total_original,
    });

    const returnPortadorAndInstallment = {
      PortadorCartao: portador_cartao,
      Installments: installments,
    };

    return response.json(returnPortadorAndInstallment);
  }
}
