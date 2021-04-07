import { uuid } from 'uuidv4';

import IProdutosRepository from '@modules/projetos/repositories/IProdutosRepository';
import ICreateProdutoDTO from '@modules/projetos/dtos/ICreateProdutoDTO';

import Produto from '../../infra/typeorm/entities/Produtos';

class FakeProdutosRepository implements IProdutosRepository {
  private produtos: Produto[] = [];

  public async findById(id: string): Promise<Produto | undefined> {
    const findProduto = this.produtos.find(produto => produto.id === id);

    return findProduto;
  }

  public async findByName(
    descricao_item: string
  ): Promise<Produto | undefined> {
    const findProduto = this.produtos.find(
      produto => produto.descricao_item === descricao_item,
    );

    return findProduto;
  }

  public async create(produtoData: ICreateProdutoDTO): Promise<Produto> {
    const produto = new Produto();

    Object.assign(produto, { id: uuid() }, produtoData);

    this.produtos.push(produto);

    return produto;
  }

  public async save(produto: Produto): Promise<Produto> {
    const findProdutoIndex = this.produtos.findIndex(
      produtoIndex => produtoIndex.id === produto.id,
    );

    this.produtos[findProdutoIndex] = produto;

    return produto;
  }
}

export default FakeProdutosRepository;
