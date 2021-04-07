import { Request, Response } from 'express';
import GetBrandAndInstallmentCreditCardService from '../../../services/GetBrandAndInstallmentCreditCardService'

export default class SellsPortadorCartaoController {
  async create(request: Request, response: Response): Promise<Response> {
    const { bin, vl_total_original } = request.body;

    // 1 - GetBrand - flagCard - Aguardando retorno da PagSeguro
    // 2 - Return installments
    const getInstallmentCreditCardService = new GetBrandAndInstallmentCreditCardService();
    const installments = await getInstallmentCreditCardService.execute({
      bin,
      amount: vl_total_original,
    });

    return response.json(installments);
  }
}
