import Operadora from '../infra/typeorm/entities/Operadora';
import ICreateOperadoraDTO from '../dtos/ICreateOperadoraDTO';

export default interface IOperadorasRepository {
  findById(id: string): Promise<Operadora | undefined>;
  findByName(name: string): Promise<Operadora | undefined>;
  create(data: ICreateOperadoraDTO): Promise<Operadora>;
  save(operadora: Operadora): Promise<Operadora>;
}
