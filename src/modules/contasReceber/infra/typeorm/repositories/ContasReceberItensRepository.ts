import { getRepository, Repository } from 'typeorm';

import IContasReceberItemRepository from '@modules/contasReceber/repositories/IContasReceberItemRepository';
import ICreateContasReceberItemDTO from '@modules/contasReceber/dtos/ICreateContasReceberItemDTO';

import ContasReceberItens from '../entities/ContasReceberItem';

class ContasReceberItensRepository implements IContasReceberItemRepository {
  private ormRepository: Repository<ContasReceberItens>;

  constructor() {
    this.ormRepository = getRepository(ContasReceberItens);
  }

  public async findByName(
    descricao_item: string
  ): Promise<ContasReceberItens | undefined> {
    const contasReceber = await this.ormRepository.findOne({
      where: { descricao_item },
    });

    return contasReceber;
  }

  public async findAllItensFromContasReceber(
    contas_receber_id: string
  ): Promise<ContasReceberItens[] | undefined> {
    const contasReceber: ContasReceberItens[] = await this.ormRepository.find({
      where: {
        contas_receber_id,
      },
    });

    return contasReceber;
  }

  public async findById(id: string): Promise<ContasReceberItens | undefined> {
    const contasReceberItem = await this.ormRepository.findOne(id);

    return contasReceberItem;
  }

  public async create({
    contas_receber_id,
    produto_id,
    tipo_produto,
    ordem_item,
    descricao_item,
    valor_item,
    dt_receber,
    vl_receber,
  }: ICreateContasReceberItemDTO): Promise<ContasReceberItens> {
    const contasReceberItem = this.ormRepository.create({
      contas_receber_id,
      produto_id,
      tipo_produto,
      ordem_item,
      descricao_item,
      valor_item,
      dt_receber,
      vl_receber,
    });

    await this.ormRepository.save(contasReceberItem);

    return contasReceberItem;
  }

  public async save(
    contasReceber: ContasReceberItens,
  ): Promise<ContasReceberItens> {
    return this.ormRepository.save(contasReceber);
  }
}

export default ContasReceberItensRepository;
