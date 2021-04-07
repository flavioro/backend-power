import { Request, Response } from 'express';
import { container } from 'tsyringe';

import date from '@shared/tools/date';
import AppError from '@shared/errors/AppError';
import OperadorasRepository from '@modules/operadoras/infra/typeorm/repositories/OperadorasRepository';
import CreateContasReceberService from '@modules/contasReceber/services/CreateContasReceberService';
import CreateContasReceberItensService from '@modules/contasReceber/services/CreateContasReceberItemService';
import CreateSellCreditCardService from '../../../services/GetTokenAndPaymentCreditCardService';

export default class SellsCreditCardController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      cardNumber,
      cardBrand,
      cardCvv,
      cardExpirationMonth,
      cardExpirationYear,
      quantity,
      installmentAmount,
      valueTotal,
      method,
      itens,
      pessoa_id,
      operadora,
    } = request.body;

    const sellCreditCardService = container.resolve(
      CreateSellCreditCardService,
    );

    const sellCreditCard = await sellCreditCardService.execute({
      cardNumber,
      cardBrand,
      cardCvv,
      cardExpirationMonth,
      cardExpirationYear,
      quantity,
      installmentAmount,
      valueTotal,
      method,
      itens,
      pessoa_id,
    });

    const RepositoryOperadora = new OperadorasRepository();
    const newOperadora = await RepositoryOperadora.findByName(operadora);
    if (!newOperadora) {
      throw new AppError('Operadora not found.');
    }

    const createContasReceberService = container.resolve(
      CreateContasReceberService,
    );

    const totalItens = Object.keys(itens).length;

    const days = !newOperadora.dias_pag
      ? Number(process.env.PAG_SEGURO_DAYS_PAYMENT)
      : newOperadora.dias_pag;

    const contasReceber = await createContasReceberService.execute({
      pessoa_id,
      operadora_id: newOperadora.id,
      total_itens: totalItens,
      total_parcelas: quantity,
      dt_receber: date.addDays(new Date(), days),
      vl_receber: sellCreditCard.content.netAmount,
      vl_taxa: sellCreditCard.content.feeAmount,
      vl_parcela: installmentAmount,
      vl_desconto: sellCreditCard.content.discountAmount,
      vl_extra: sellCreditCard.content.extraAmount,
      dt_venda: new Date(),
      vl_total_original: valueTotal,
      origem: newOperadora.operadora,
      tipo_recebimento: method,
      referencia: sellCreditCard.content.reference,
      status: sellCreditCard.status,
      protocolo: sellCreditCard.content.code,
    });

    const createContasReceberItemService = container.resolve(
      CreateContasReceberItensService,
    );

    const itensSave = itens.map(async item => {
      const itemNew = await createContasReceberItemService.execute({
        contas_receber_id: contasReceber.id,
        produto_id: item.id,
        tipo_produto: item.tipo_produto,
        descricao_item: item.description,
        valor_item: item.amount,
      });
      return itemNew;
    });

    const resultPromise = await (async () => {
      const resultado = await Promise.all(itensSave);
      return resultado;
    })();

    const returnSell = {
      PagSeguro: sellCreditCard,
      ContasReceber: contasReceber,
      Itens: resultPromise,
    };

    return response.json(returnSell);
  }
}
