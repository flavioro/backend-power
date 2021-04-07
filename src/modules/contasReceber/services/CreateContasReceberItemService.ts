import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import ContasReceberItem from '../infra/typeorm/entities/ContasReceberItem';
import IContasReceberItemRepository from '../repositories/IContasReceberItemRepository';

interface IRequest {
  contas_receber_id: string;
  produto_id: string;
  tipo_produto: string;
  ordem_item?: number;
  descricao_item: string;
  valor_item: number;
  dt_receber?: Date;
  vl_receber?: number;
}

@injectable()
class CreateContasReceberItemService {
  constructor(
    @inject('ContasReceberItensRepository')
    private contasReceberItemRepository: IContasReceberItemRepository,
  ) {}

  public async execute({
    contas_receber_id,
    produto_id,
    tipo_produto,
    ordem_item,
    descricao_item,
    valor_item,
    dt_receber,
    vl_receber,
  }: IRequest): Promise<ContasReceberItem> {
    const contasReceberItemCreate = this.contasReceberItemRepository.create({
      contas_receber_id,
      produto_id,
      tipo_produto,
      ordem_item,
      descricao_item,
      valor_item,
      dt_receber,
      vl_receber,
    });

    return contasReceberItemCreate;
  }
}

export default CreateContasReceberItemService;
