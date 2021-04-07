// import AppError from '@shared/errors/AppError';

import FakeContasReceberItemRepository from '../repositories/fakes/FakeContasReceberItemRepository';
import CreateContasReceberItemService from './CreateContasReceberItemService';

let fakeContasReceberItemRepository: FakeContasReceberItemRepository;
let createContasReceberItem: CreateContasReceberItemService;

describe('CreateContasReceberItem', () => {
  beforeEach(() => {
    fakeContasReceberItemRepository = new FakeContasReceberItemRepository();
    createContasReceberItem = new CreateContasReceberItemService(
      fakeContasReceberItemRepository,
    );
  });

  it('should be able to create a new contasReceberItem', async () => {
    const contasReceberItem = await createContasReceberItem.execute({
      contas_receber_id: 'string',
      produto_id: 'string',
      tipo_produto: 'string',
      ordem_item: 123,
      descricao_item: 'string',
      valor_item: 123.5,
      dt_receber: new Date(2020, 4, 10, 13),
      vl_receber: 123.5,
    });

    expect(contasReceberItem).toHaveProperty('id');
  });

  it('should be able to create a new contasReceberItem, no required fields', async () => {
    const contasReceberItem = await createContasReceberItem.execute({
      contas_receber_id: 'string',
      produto_id: 'string',
      tipo_produto: 'string',
      descricao_item: 'string',
      valor_item: 123.5,
    });

    expect(contasReceberItem).toHaveProperty('id');
  });
});
