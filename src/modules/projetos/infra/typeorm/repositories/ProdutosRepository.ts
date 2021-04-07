import { getRepository, Repository } from 'typeorm';

import IProdutosRepository from '@modules/produtos/repositories/IProdutosRepository';
import ICreateProdutoDTO from '@modules/produtos/dtos/ICreateProdutoDTO';

import Produtos from '../entities/Produtos';

class ProdutosRepository implements IProdutosRepository {
  private ormRepository: Repository<Produtos>;

  constructor() {
    this.ormRepository = getRepository(Produtos);
  }

  public async findByName(
    descricao_item: string,
  ): Promise<Produtos | undefined> {
    const produto = await this.ormRepository.findOne({
      where: { descricao_item },
    });

    return produto;
  }

  public async findById(id: string): Promise<Produtos | undefined> {
    const produto = await this.ormRepository.findOne(id);

    return produto;
  }

  public async create({
    projeto_id,
    descricao_item,
    preco,
    tipo_projeto,
  }: ICreateProdutoDTO): Promise<Produtos> {
    const produto = this.ormRepository.create({
      projeto_id,
      descricao_item,
      preco,
      tipo_projeto,
    });

    await this.ormRepository.save(produto);

    return produto;
  }

  public async save(produto: Produtos): Promise<Produtos> {
    return this.ormRepository.save(produto);
  }
}

export default ProdutosRepository;
