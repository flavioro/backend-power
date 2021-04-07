import { uuid } from 'uuidv4';

import IProjetosRepository from '@modules/projetos/repositories/IProjetosRepository';
import ICreateProjetoDTO from '@modules/projetos/dtos/ICreateProjetoDTO';

import Projeto from '../../infra/typeorm/entities/Projetos';

class FakeProjetosRepository implements IProjetosRepository {
  private projetos: Projeto[] = [];

  public async findById(id: string): Promise<Projeto | undefined> {
    const findProjeto = this.projetos.find(projeto => projeto.id === id);

    return findProjeto;
  }

  public async findByName(name: string): Promise<Projeto | undefined> {
    const findProjeto = this.projetos.find(
      projeto => projeto.nome_projeto === name,
    );

    return findProjeto;
  }

  public async findAll(): Promise<Projeto[] | undefined> {
    return this.projetos;
  }

  public async create(projetoData: ICreateProjetoDTO): Promise<Projeto> {
    const projeto = new Projeto();

    Object.assign(projeto, { id: uuid(), ativo: true }, projetoData);

    this.projetos.push(projeto);

    return projeto;
  }

  public async save(projeto: Projeto): Promise<Projeto> {
    const findProjetoIndex = this.projetos.findIndex(
      projetoIndex => projetoIndex.id === projeto.id,
    );

    this.projetos[findProjetoIndex] = projeto;

    return projeto;
  }
}

export default FakeProjetosRepository;
