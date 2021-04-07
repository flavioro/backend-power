import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import PessoasRepository from '@modules/pessoas/infra/typeorm/repositories/PessoasRepository';
import CreatePessoaService from '@modules/pessoas/services/CreatePessoaService';

import OperadorasRepository from '@modules/operadoras/infra/typeorm/repositories/OperadorasRepository';
import ShowOperadoraService from '@modules/operadoras/services/ShowOperadoraService';

// import ProjetosRepository from '@modules/projetos/infra/typeorm/repositories/ProjetosRepository';
// import CreateProjetoService from '@modules/projetos/services/CreateProjetoService';

import ContasReceberRepository from '@modules/contasReceber/infra/typeorm/repositories/ContasReceberRepository';
import CreateContasReceberService from '@modules/contasReceber/services/CreateContasReceberService';

import PagSeguro from '@shared/container/providers/PagSeguroProvider/implementations/PagSeguroPaymentProvider.js';

interface IRequest {
  name?: string;
  email: string;
  tipo_cadastro: string;
  user_id: string;
  cpf: string;
  dt_nascimento: Date;
  country: string;
  phone: string;
  uf: string;
  cidade: string;
  cep: string;
  bairro: string;
  logradouro: string;
  numero_casa: string;
  complemento: string;
  operadora: string;
  referencia: string;
  dt_venda: Date;
  vl_total_original: number;
  dt_receber: Date;
  vl_receber: number;
  tarifa_intermediacao: number;
  taxa_intermediacao: number;
  taxa_parcelamento_cartao: number;
  origem: string;
  tipo_recebimento: string;
}

@injectable()
class CreateSellsService {
  public async execute({
    name,
    email,
    cpf,
    dt_nascimento,
    country,
    phone,
  }: IRequest): Promise<string> {

    const operadorasRepository = new OperadorasRepository();
    const showOperadora = new ShowOperadoraService(operadorasRepository);

    // const projetosRepository = new ProjetosRepository();
    // const createProjeto = new CreateProjetoService(projetosRepository);

    const contasReceberRepository = new ContasReceberRepository();
    const createContasReceber = new CreateContasReceberService(
      contasReceberRepository,
    );

    const pessoaCreate = await createPessoa.execute({
      user_id: userCreate.id,
      cpf,
      dt_nascimento,
      country,
      phone,
      uf,
      cidade,
      cep,
      bairro,
      logradouro,
      numero_casa,
      complemento,
    });

    if (!pessoaCreate) {
      throw new AppError('It was not possible to register the client.');
    }

    const operadoraShow = await showOperadora.execute({ operadora });

    if (!operadoraShow) {
      throw new AppError('Verify name operadora');
    }

    // Consultar itens no bd

    // Gerar referencia (data, hora, pessoa(id-nome), projeto)
    const createReferencia = `${Date.now()}|${pessoaCreate.id}|${
      pessoaCreate.user_id
    }`;

    const pedido = {
      method: tipo_recebimento,

      // extraAmount: 10.0,

      reference: createReferencia,

      sender: {
        name: userCreate.name,
        email: userCreate.email,

        phone: {
          areaCode: 48,
          number: pessoaCreate.phone
        },

        document: {
          type: 'CPF',
          value: pessoaCreate.cpf,
        },
      },

      billing: {
        street: pessoaCreate.logradouro,
        number: pessoaCreate.numero_casa,
        complement: 'Casa',
        district: pessoaCreate.cidade,
        city: pessoaCreate.cidade,
        state: pessoaCreate.uf,
        country: 'BRA',
        postalCode: pessoaCreate.cep,
      },

      items: [
        {
          id: 1,
          description: 'Produto 1,',
          quantity: 2,
          amount: 2,
        },
        {
          id: 2,
          description: 'Produto 2',
          quantity: 1,
          amount: 60.0,
        },
      ],
    };

    const pagSeguroReturn = await PagSeguro.boleto(pedido);

    // Create collum itemCount
    await createContasReceber.execute({
      pessoa_id: pessoaCreate.id,
      operadora_id: operadoraShow.id,
      total_itens: pagSeguroReturn.content.itemCount,
      dt_venda: new Date(pagSeguroReturn.content.date),
      vl_total_original: pagSeguroReturn.content.grossAmount,
      dt_receber: new Date(pagSeguroReturn.content.date), // Corrigir data
      vl_receber: pagSeguroReturn.content.netAmount,
      tarifa_intermediacao: operadoraShow.tarifa_intermediacao,
      taxa_intermediacao: operadoraShow.valor_fixo,
      taxa_parcelamento_cartao: operadoraShow.taxa_parcelamento,
      origem: operadoraShow.operadora,
      tipo_recebimento,
      referencia: createReferencia,
      status: pagSeguroReturn.status,
      protocolo: pagSeguroReturn.content.code,
      link_pag: pagSeguroReturn.content.paymentLink,
    });

    return pagSeguroReturn;
  }
}

export default CreateSellsService;
