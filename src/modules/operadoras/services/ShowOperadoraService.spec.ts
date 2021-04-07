import AppError from '@shared/errors/AppError';

import FakeOperadorasRepository from '../repositories/fakes/FakeOperadorasRepository';
import ShowOperadoraService from './ShowOperadoraService';

let fakeOperadorasRepository: FakeOperadorasRepository;
let showOperadoraService: ShowOperadoraService;

describe('ShowOperadora', () => {
  beforeEach(() => {
    fakeOperadorasRepository = new FakeOperadorasRepository();
    showOperadoraService = new ShowOperadoraService(fakeOperadorasRepository);
  });

  it('should be able show the operadora', async () => {
    const createOperadora = await fakeOperadorasRepository.create({
      operadora: 'PagSeguro',
      valor_fixo: 12,
      taxa_vista: 5,
      taxa_parcelamento: 3,
    });

    const queryOperadora = await showOperadoraService.execute({
      operadora: createOperadora.operadora,
    });

    expect(queryOperadora.operadora).toBe('PagSeguro');
    expect(queryOperadora.taxa_parcelamento).toBe(3);
  });

  it('should not be able show the operardora from non-existing operadora', async () => {
    await expect(
      showOperadoraService.execute({
        operadora: 'non-existing-operadora-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
