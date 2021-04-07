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
  nome?: string;
  email: string;
  tipo_cadastro: string;
  phone?: string;
}

@injectable()
class CreatePeopleContactSiteService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({
    nome,
    email,
    tipo_cadastro,
    phone,
  }: IRequest): Promise<Pessoa> {
    const checkEmailPeopleExists = await this.pessoasRepository.findByEmail(
      email,
    );
    if (
      checkEmailPeopleExists &&
      checkEmailPeopleExists.tipo_cadastro.toUpperCase() !==
        enumTypeRegister.Inscrito
    ) {
      throw new AppError('Email people already used.');
    }

    // eslint-disable-next-line no-param-reassign
    tipo_cadastro = removeAccents(tipo_cadastro).toUpperCase();

    const isValidRegister = type.isValidItemEnum(
      tipo_cadastro,
      enumTypeRegister,
    );

    if (!isValidRegister) {
      throw new AppError('The type register is not valid.');
    }

    if (tipo_cadastro !== enumTypeRegister.ContatoSite) {
      throw new AppError(
        'The type register is not valid, correct is "ContatoSite".',
      );
    }

    const phoneOnlyNumbers: string | undefined = ValidatePhone.strip(
      phone as string,
    );

    if (phoneOnlyNumbers.length < 10) {
      throw new AppError('Number phone incorrect or missing digits');
    }

    // Email already existent to type register 'inscrito'
    if (checkEmailPeopleExists) {
      checkEmailPeopleExists.nome = nome as string;
      checkEmailPeopleExists.tipo_cadastro = tipo_cadastro as string;
      checkEmailPeopleExists.phone = phone as string;
      this.pessoasRepository.save(checkEmailPeopleExists);
      return checkEmailPeopleExists;
    }
    const pessoa = this.pessoasRepository.create({
      nome,
      email,
      tipo_cadastro,
      phone: phoneOnlyNumbers,
    });

    return pessoa;
  }
}

export default CreatePeopleContactSiteService;
