import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Projeto from '../infra/typeorm/entities/Projetos';
import IProjetosRepository from '../repositories/IProjetosRepository';

interface IRequest {
  descricao_projeto: string;
}

@injectable()
class ShowProjetoService {
  constructor(
    @inject('ProjetosRepository')
    private projetoRepository: IProjetosRepository,
  ) {}

  public async execute({ descricao_projeto }: IRequest): Promise<Projeto> {
    const projeto = await this.projetoRepository.findByName(descricao_projeto);

    if (!projeto) {
      throw new AppError('projeto not found');
    }

    return projeto;
  }
}

export default ShowProjetoService;
