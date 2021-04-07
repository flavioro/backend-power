import Projeto from '../infra/typeorm/entities/Projetos';
import ICreateProjetoDTO from '../dtos/ICreateProjetoDTO';

export default interface IProjetosRepository {
  findById(id: string): Promise<Projeto | undefined>;
  findByName(name: string): Promise<Projeto | undefined>;
  findAll(): Promise<Projeto[] | undefined>;
  create(data: ICreateProjetoDTO): Promise<Projeto>;
  save(projeto: Projeto): Promise<Projeto>;
}
