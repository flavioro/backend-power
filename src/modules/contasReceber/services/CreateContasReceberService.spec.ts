import date from '@shared/tools/date';

import FakeContasReceberRepository from '../repositories/fakes/FakeContasReceberRepository';
import CreateContasReceberService from './CreateContasReceberService';

let fakeContasReceberRepository: FakeContasReceberRepository;
let createContasReceber: CreateContasReceberService;

describe('CreateContasReceber', () => {
  beforeEach(() => {
    fakeContasReceberRepository = new FakeContasReceberRepository();
    createContasReceber = new CreateContasReceberService(
      fakeContasReceberRepository,
    );
  });

  it('should be able to create a new contasReceber', async () => {
    const contasReceber = await createContasReceber.execute({
      pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      operadora_id: '7f855f5c-d472-4dff-9bf5-df257e2feda4',
      total_itens: 3,
      total_parcelas: 4,
      dt_venda: new Date(),
      vl_total_original: 2370,
      dt_receber: date.addDays(new Date(), 14),
      vl_receber: 2181.66,
      vl_parcela: 610.22,
      vl_taxa: 188.34,
      vl_desconto: 0,
      vl_extra: 0,
      tarifa_intermediacao: 0.4,
      taxa_intermediacao: 3.99,
      taxa_parcelamento_cartao: 3.99,
      origem: 'PagSeguro',
      tipo_recebimento: 'creditCard',
      referencia: 'Tipo CREDITCARD, 23/09/2020 10:35, valorTotal 610.22',
      status: 'success',
      protocolo: 'F0846B14-A2A1-42BA-A68A-AA39F41957CB',
      link_pag: '',
    });

    expect(contasReceber).toHaveProperty('id');
  });

  it('should be able to create a new contasReceber, no required fields ', async () => {
    const contasReceber = await createContasReceber.execute({
      pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      operadora_id: '7f855f5c-d472-4dff-9bf5-df257e2feda4',
      total_itens: 3,
      total_parcelas: 1,
      dt_venda: new Date(2020, 4, 10, 13),
      vl_total_original: 123,
      origem: 'PagSeguro',
      tipo_recebimento: 'cartão credito',
      referencia: 'string',
      status: 'string',
    });

    expect(contasReceber).toHaveProperty('id');
  });
});
