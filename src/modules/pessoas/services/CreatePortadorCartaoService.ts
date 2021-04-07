/* eslint-disable camelcase */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ValidateCPF from '@shared/tools/cpf';

import PortadorCartao from '../infra/typeorm/entities/PortadorCartao';
import IPortadorCartaoRepository from '../repositories/IPortadorCartaoRepository';

interface IRequest {
  pessoa_id: string;
  name: string;
  email?: string;
  cpf: string;
  dt_nascimento: Date;
  phone: string;
}

@injectable()
class CreatePortadorCartaoService {
  constructor(
    @inject('PortadorCartaoRepository')
    private portadorCartaoRepository: IPortadorCartaoRepository,
  ) {}

  public async execute({
    pessoa_id,
    name,
    email,
    cpf,
    dt_nascimento,
    phone,
  }: IRequest): Promise<PortadorCartao> {
    if (!ValidateCPF.isValid(cpf)) {
      throw new AppError("The carrier's CPF is not valid.");
    }

    const cpfOnlyNumbers = ValidateCPF.strip(cpf);
    const phoneOnlyNumbers = ValidateCPF.strip(phone);

    const checkCpfExists = await this.portadorCartaoRepository.findByCPF(
      cpfOnlyNumbers,
    );

    if (checkCpfExists) {
      throw new AppError('CPF portador already used.');
    }

    const checkEmailExists = await this.portadorCartaoRepository.findByEmail(
      email as string,
    );
    if (checkEmailExists) {
      throw new AppError('Email portador already used.');
    }

    const portador_cartao = this.portadorCartaoRepository.create({
      pessoa_id,
      name,
      email,
      cpf: cpfOnlyNumbers,
      dt_nascimento,
      phone: phoneOnlyNumbers,
    });

    return portador_cartao;
  }
}

export default CreatePortadorCartaoService;
