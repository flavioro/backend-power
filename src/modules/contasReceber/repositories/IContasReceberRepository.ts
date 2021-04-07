import ContasReceber from '../infra/typeorm/entities/ContasReceber';
import ICreateContasReceberDTO from '../dtos/ICreateContasReceberDTO';

export default interface IContasReceberRepository {
  findById(id: string): Promise<ContasReceber | undefined>;
  create(data: ICreateContasReceberDTO): Promise<ContasReceber>;
  save(contasReceber: ContasReceber): Promise<ContasReceber>;
}
