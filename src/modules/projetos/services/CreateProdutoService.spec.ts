import AppError from '@shared/errors/AppError';

import FakeProdutosRepository from '../repositories/fakes/FakeProdutosRepository';
import CreateProdutoService from './CreateProdutoService';

let fakeProdutosRepository: FakeProdutosRepository;
let createProduto: CreateProdutoService;

describe('CreateProduto', () => {
  beforeEach(() => {
    fakeProdutosRepository = new FakeProdutosRepository();
    createProduto = new CreateProdutoService(fakeProdutosRepository);
  });

  it('should be able to create a new produto', async () => {
    const produto = await createProduto.execute({
      projeto_id: 'id-projeto',
      descricao_item: 'Projeto Eletrico',
      preco: 859.9,
      tipo_projeto: 'Opcional',
    });

    expect(produto).toHaveProperty('id');
  });

  it('should be able to create a new produto with same name from another not used in the same project.', async () => {
    const produto1 = await createProduto.execute({
      projeto_id: 'id-projeto1',
      descricao_item: 'Projeto Eletrico',
      preco: 859.9,
      tipo_projeto: 'Opcional',
    });

    const produto2 = await createProduto.execute({
      projeto_id: 'id-projeto2',
      descricao_item: 'Projeto Eletrico',
      preco: 759.9,
      tipo_projeto: 'Opcional',
    });

    expect(produto1).toHaveProperty('id');
    expect(produto2).toHaveProperty('id');
  });

  it('should not be able to create a new produto with same name from another used in the same project.', async () => {
    await createProduto.execute({
      projeto_id: 'id-projeto',
      descricao_item: 'Projeto Eletrico',
      preco: 859.9,
      tipo_projeto: 'Opcional',
    });

    await expect(
      createProduto.execute({
        projeto_id: 'id-projeto',
        descricao_item: 'Projeto Eletrico',
        preco: 859.9,
        tipo_projeto: 'Opcional',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
