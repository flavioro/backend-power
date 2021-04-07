import { uuid } from 'uuidv4';

import IContasReceberItemRepository from '@modules/contasReceber/repositories/IContasReceberItemRepository';
import ICreateContasReceberItemDTO from '@modules/contasReceber/dtos/ICreateContasReceberItemDTO';

import ContasReceberItem from '../../infra/typeorm/entities/ContasReceberItem';

class ContasReceberItensRepository implements IContasReceberItemRepository {
  private contasReceberItens: ContasReceberItem[] = [];

  public async findById(id: string): Promise<ContasReceberItem | undefined> {
    const findContaReceber = this.contasReceberItens.find(
      contaReceber => contaReceber.id === id,
    );

    return findContaReceber;
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
  }: ICreateContasReceberItemDTO): Promise<ContasReceberItem> {
    const contasReceberItem = new ContasReceberItem();

    Object.assign(contasReceberItem, {
      id: uuid(),
      contas_receber_id,
      produto_id,
      tipo_produto,
      ordem_item,
      descricao_item,
      valor_item,
      dt_receber,
      vl_receber,
    });

    this.contasReceberItens.push(contasReceberItem);

    return contasReceberItem;
  }

  public async save(
    contasReceberItem: ContasReceberItem,
  ): Promise<ContasReceberItem> {
    const findContasReceberItemIndex = this.contasReceberItens.findIndex(
      contasReceberItemIndex =>
        contasReceberItemIndex.id === contasReceberItem.id,
    );
    this.contasReceberItens[findContasReceberItemIndex] = contasReceberItem;

    return contasReceberItem;
  }

  public async findAllItensFromContasReceber(
    contas_receber_id: string,
  ): Promise<ContasReceberItem[]> {
    let { contasReceberItens } = this;

    contasReceberItens = this.contasReceberItens.filter(
      contasReceberItem => contasReceberItem.id === contas_receber_id,
    );

    return contasReceberItens;
  }
}

export default ContasReceberItensRepository;
