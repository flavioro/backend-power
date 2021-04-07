import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Produtos from '../infra/typeorm/entities/Produtos';
import IProdutosRepository from '../repositories/IProdutosRepository';

interface IRequest {
  projeto_id: string;
  descricao_item: string;
  preco: number;
  tipo_projeto: string;
}

@injectable()
class CreateProdutoService {
  constructor(
    @inject('ProdutosRepository')
    private produtosRepository: IProdutosRepository,
  ) {}

  public async execute({
    projeto_id,
    descricao_item,
    preco,
    tipo_projeto,
  }: IRequest): Promise<Produtos> {
    const checkProdutoExists = await this.produtosRepository.findByName(
      descricao_item,
    );

    if (checkProdutoExists && checkProdutoExists.projeto_id === projeto_id) {
      throw new AppError('Name of the product already used in this project');
    }

    const produtoCreate = this.produtosRepository.create({
      projeto_id,
      descricao_item,
      preco,
      tipo_projeto,
    });

    return produtoCreate;
  }
}

export default CreateProdutoService;
