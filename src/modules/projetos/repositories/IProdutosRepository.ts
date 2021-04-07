import Produto from '../infra/typeorm/entities/Produtos';
import ICreateProdutoDTO from '../dtos/ICreateProdutoDTO';

export default interface IProdutosRepository {
  findById(id: string): Promise<Produto | undefined>;
  findByName(descricao_item: string): Promise<Produto | undefined>;
  create(data: ICreateProdutoDTO): Promise<Produto>;
  save(produto: Produto): Promise<Produto>;
}
