/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import removeAccents from '@shared/tools/string/removeAccents';
import type from '@shared/tools/enum/validationItemEnum';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';

import enumTypeRegister from '../../../@types/enumCadastro';

interface IRequest {
  email: string;
  tipo_cadastro: string;
}

@injectable()
class CreatePessoaService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({ email, tipo_cadastro }: IRequest): Promise<Pessoa> {
    // eslint-disable-next-line no-param-reassign
    tipo_cadastro = removeAccents(tipo_cadastro).toUpperCase();

    const isValidRegister = type.isValidItemEnum(
      tipo_cadastro,
      enumTypeRegister,
    );

    if (!isValidRegister) {
      throw new AppError('The type register is not valid.');
    }

    if (tipo_cadastro !== enumTypeRegister.Inscrito) {
      throw new AppError(
        'The type register is not valid, correct is "Inscrito".',
      );
    }

    const checkEmailPeopleExists = await this.pessoasRepository.findByEmail(
      email,
    );

    if (checkEmailPeopleExists) {
      throw new AppError('Email people already used.');
    }

    const pessoa = this.pessoasRepository.create({
      email,
      tipo_cadastro,
    });

    return pessoa;
  }
}

export default CreatePessoaService;
