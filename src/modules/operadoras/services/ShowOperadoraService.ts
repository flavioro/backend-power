import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOperadorasRepository from '../repositories/IOperadorasRepository';

import Operadora from '../infra/typeorm/entities/Operadora';

interface IRequest {
  operadora: string;
}

@injectable()
class ShowOperadoraService {
  constructor(
    @inject('OperadorasRepository')
    private operadorasRepository: IOperadorasRepository,
  ) {}

  public async execute({ operadora }: IRequest): Promise<Operadora> {
    const operadoraExists = await this.operadorasRepository.findByName(operadora);

    if (!operadoraExists) {
      throw new AppError('Operadora not found');
    }

    return operadoraExists;
  }
}

export default ShowOperadoraService;
