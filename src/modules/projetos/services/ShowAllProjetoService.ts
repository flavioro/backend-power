import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Projeto from '../infra/typeorm/entities/Projetos';
import IProjetosRepository from '../repositories/IProjetosRepository';

@injectable()
class ShowProjetoService {
  constructor(
    @inject('ProjetosRepository')
    private projetoRepository: IProjetosRepository,
  ) {}

  public async execute(): Promise<Projeto[]> {
    const projetos = await this.projetoRepository.findAll();

    if (!projetos) {
      throw new AppError('projetos not found');
    }

    return projetos;
  }
}

export default ShowProjetoService;
