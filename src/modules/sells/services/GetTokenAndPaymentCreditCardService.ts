import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import PagSeguroProvider from '@shared/container/providers/PagSeguroProvider/implementations/PagSeguroPaymentProvider';
import AppError from '@shared/errors/AppError';
import date from '@shared/tools/date';

import IItemDTO from '@shared/container/providers/PagSeguroProvider/dtos/IItemDTO';
import IAddressDTO from '@shared/container/providers/PagSeguroProvider/dtos/IAddressDTO';
import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
// import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';

require('dotenv/config');

interface IRequest {
  cardNumber: number;
  cardBrand: string;
  cardCvv: string;
  cardExpirationMonth: number;
  cardExpirationYear: number;
  quantity: number;
  installmentAmount: number;
  valueTotal: number;
  method: string;
  itens: IItemDTO[];
  // billing: IAddressDTO;
  pessoa_id: string;
}

@injectable()
class GetBrandAndInstallmentCreditCardService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({
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
    // billing,
    pessoa_id,
  }: IRequest): Promise<any> {
    // Token
    const cardLocal = {
      cardNumber,
      cardBrand,
      cardCvv,
      cardExpirationMonth,
      cardExpirationYear,
    };

    const config = {
      card: cardLocal,
    };
    const token = await PagSeguroProvider.token(config);
    // Get session already existing

    // Payment
    const pessoa = await this.pessoasRepository.findById(pessoa_id);

    if (!pessoa) {
      throw new AppError("People not found.");
    }

    // eslint-disable-next-line no-param-reassign
    const billing = {
      street: pessoa.logradouro,
      number: Number(pessoa.numero_casa),
      complement: pessoa.complemento,
      district: pessoa.bairro,
      city: pessoa.cidade,
      state: pessoa.uf,
      country: pessoa.country, //BRA
      postalCode: pessoa.cep,
    };

    const email =
      process.env.PAG_SEGURO_ENV === 'sandbox'
      ? 'c46537309654892146172@sandbox.pagseguro.com.br'
      : pessoa.email;

    let areaCode = '';
    let phone = '';
    if (pessoa.phone && pessoa.phone.length > 9) {
      areaCode = pessoa.phone.toString().substring(0, 2);
      phone = pessoa.phone.toString().substring(2, pessoa.phone.length);
    }

    const request = {
      method,

      reference: `Tipo ${method}, ${date.dateAndHoursNowFormatted()}, valorTotal ${valueTotal}`,

      sender: {
        name: pessoa.nome,
        email,

        phone: {
          areaCode,
          number: phone,
        },

        document: {
          type: 'CPF',
          value: pessoa.cpf,
        },
      },

      billing,

      items: itens,

      creditCard: {
        token: token.content.token,

        holder: {
          name: pessoa.nome,
          document: {
            type: 'CPF',
            value: pessoa.cpf,
          },
        },
        installment: {
          quantity,
          maxInstallmentNoInterest: Number(
            process.env.PAG_SEGURO_MAX_INSTALLMENT_NO_INTEREST,
          ),
          installmentAmount,
          // valueTotal,
        },
      },
    };

    const venda = await PagSeguroProvider.cartaoCredito(request);

    return venda;
  }
}

export default GetBrandAndInstallmentCreditCardService;
