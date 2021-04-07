import ContasReceberItem from '../infra/typeorm/entities/ContasReceberItem';
import ICreateContasReceberItemDTO from '../dtos/ICreateContasReceberItemDTO';

export default interface IContasReceberItemRepository {

  findById(id: string): Promise<ContasReceberItem | undefined>;

  findAllItensFromContasReceber(
    contasReceber_id: string,
  ): Promise<ContasReceberItem[] | undefined>;

  create(data: ICreateContasReceberItemDTO): Promise<ContasReceberItem>;

  save(contasReceberItem: ContasReceberItem): Promise<ContasReceberItem>;
}
