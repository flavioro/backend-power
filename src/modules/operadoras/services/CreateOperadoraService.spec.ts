import AppError from '@shared/errors/AppError';

import FakeOperadorasRepository from '../repositories/fakes/FakeOperadorasRepository';
import CreateOperadoraService from './CreateOperadoraService';

let fakeOperadorasRepository: FakeOperadorasRepository;
let createOperadora: CreateOperadoraService;

describe('CreateOperadora', () => {
  beforeEach(() => {
    fakeOperadorasRepository = new FakeOperadorasRepository();
    createOperadora = new CreateOperadoraService(fakeOperadorasRepository);
  });

  it('should be able to create a new operadora', async () => {
    const operadora = await createOperadora.execute({
      operadora: 'PagSeguro',
      valor_fixo: 12,
      taxa_vista: 5,
      taxa_parcelamento: 3,
    });

    expect(operadora).toHaveProperty('id');
  });

  it('should not be able to create a new operadora with same name from another', async () => {
    await createOperadora.execute({
      operadora: 'PagSeguro',
      valor_fixo: 12,
      taxa_vista: 5,
      taxa_parcelamento: 3,
    });

    await expect(
      createOperadora.execute({
        operadora: 'PagSeguro',
        valor_fixo: 12,
        taxa_vista: 5,
        taxa_parcelamento: 3,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
