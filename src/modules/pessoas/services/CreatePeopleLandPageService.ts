/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ValidatePhone from '@shared/tools/cpf';
import removeAccents from '@shared/tools/string/removeAccents';
import type from '@shared/tools/enum/validationItemEnum';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';

import enumTypeRegister from '../../../@types/enumCadastro';

interface IRequest {
  nome: string;
  email: string;
  tipo_cadastro: string;
  phone: string;
  landPage: string;
}

@injectable()
class CreatePeopleLandPageService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({
    nome,
    email,
    tipo_cadastro,
    phone,
    landPage,
  }: IRequest): Promise<Pessoa> {
    // eslint-disable-next-line no-param-reassign
    tipo_cadastro = removeAccents(tipo_cadastro).toUpperCase();

    const isValidRegister = type.isValidItemEnum(
      tipo_cadastro,
      enumTypeRegister,
    );

    if (!isValidRegister) {
      throw new AppError('The type register is not valid.');
    }

    const phoneOnlyNumbers: string | undefined = ValidatePhone.strip(
      phone as string,
    );

    if (phoneOnlyNumbers.length < 10) {
      throw new AppError('Number phone incorrect or missing digits');
    }

    const checkEmailPeopleExists = await this.pessoasRepository.findByEmail(
      email,
    );

    if (
      checkEmailPeopleExists &&
      checkEmailPeopleExists.phone === phoneOnlyNumbers &&
      checkEmailPeopleExists.tipo_cadastro === enumTypeRegister.LandPage
    ) {
      return checkEmailPeopleExists;
    }

    const pessoa = this.pessoasRepository.create({
      nome,
      email,
      tipo_cadastro,
      phone: phoneOnlyNumbers,
      landPage,
    });

    return pessoa;
  }
}

export default CreatePeopleLandPageService;
