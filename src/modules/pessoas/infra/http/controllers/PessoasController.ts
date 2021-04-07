/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePessoaService from '@modules/pessoas/services/CreatePessoaService';

export default class PessoasController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      nome,
      email,
      tipo_cadastro,
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
    } = request.body;

    const createPessoa = container.resolve(CreatePessoaService);

    const pessoa = await createPessoa.execute({
      user_id,
      nome,
      email,
      tipo_cadastro,
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

    return response.json(pessoa);
  }
}
