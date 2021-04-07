import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Operadora from '../infra/typeorm/entities/Operadora';
import IOperadorasRepository from '../repositories/IOperadorasRepository';

interface IRequest {
  operadora: string;
  valor_fixo: number;
  taxa_vista: number;
  taxa_parcelamento: number;
}

@injectable()
class CreateOperadoraService {
  constructor(
    @inject('OperadorasRepository')
    private operadorasRepository: IOperadorasRepository,
  ) {}

  public async execute({
    operadora,
    valor_fixo,
    taxa_vista,
    taxa_parcelamento
  }: IRequest): Promise<Operadora> {
    const checkOperadoraExists = await this.operadorasRepository.findByName(
      operadora,
    );

    if (checkOperadoraExists) {
      throw new AppError('Name Operadora already used.');
    }

    const operadoraCreate = this.operadorasRepository.create({
      operadora,
      valor_fixo,
      taxa_vista,
      taxa_parcelamento,
    });

    return operadoraCreate;
  }
}

export default CreateOperadoraService;
