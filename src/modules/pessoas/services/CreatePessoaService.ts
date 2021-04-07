/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ValidateCPF from '@shared/tools/cpf';
import removeAccents from '@shared/tools/string/removeAccents';
import type from '@shared/tools/enum/validationItemEnum';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';

import enumTypeRegister from '../../../@types/enumCadastro';

interface IRequest {
  user_id?: string;
  nome?: string;
  email: string;
  tipo_cadastro: string;
  cpf?: string;
  dt_nascimento?: Date;
  country?: string;
  phone?: string;
  uf?: string;
  cidade?: string;
  cep?: string;
  bairro?: string;
  logradouro?: string;
  numero_casa?: string;
  complemento?: string;
}

@injectable()
class CreatePessoaService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({
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
    // eslint-disable-next-line operator-linebreak
    const isInscrito = tipo_cadastro === enumTypeRegister.Inscrito;
    const isContatoSite = tipo_cadastro === enumTypeRegister.ContatoSite;
    const isIscritoOrContatoSite = isInscrito || isContatoSite;

    if (!isIscritoOrContatoSite && !ValidateCPF.isValid(cpf as string)) {
      // type register is equal INSCRITO only valid email

      throw new AppError("The person's CPF is not valid.");
    }

    let cpfOnlyNumbers: string | undefined = ValidateCPF.strip(cpf as string);
    let phoneOnlyNumbers: string | undefined = ValidateCPF.strip(
      phone as string,
    );

    if (!isInscrito && phoneOnlyNumbers.length < 10) {
      throw new AppError('Number phone incorrect or missing digits');
    }

    const checkCpfPeopleExists = await this.pessoasRepository.findByCPF(
      cpfOnlyNumbers,
    );

    if (!isIscritoOrContatoSite && checkCpfPeopleExists) {
      throw new AppError('CPF people already used.');
    }

    const checkEmailPeopleExists = await this.pessoasRepository.findByEmail(
      email,
    );
    if (checkEmailPeopleExists) {
      throw new AppError('Email people already used.');
    }

    if (isInscrito) {
      cpfOnlyNumbers = undefined;
      phoneOnlyNumbers = undefined;
    } else if (isContatoSite) {
      cpfOnlyNumbers = undefined;
    }

    const pessoa = this.pessoasRepository.create({
      user_id,
      nome,
      email,
      tipo_cadastro,
      cpf: cpfOnlyNumbers,
      dt_nascimento,
      country,
      phone: phoneOnlyNumbers,
      uf,
      cidade,
      cep,
      bairro,
      logradouro,
      numero_casa,
      complemento,
    });

    return pessoa;
  }
}

export default CreatePessoaService;
