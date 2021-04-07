import AppError from '@shared/errors/AppError';

import FakePortadorCartaoRepository from '../repositories/fakes/FakePortadorCartaoRepository';
import CreatePortadorCartaoService from './CreatePortadorCartaoService';

let fakePortadorCartaoRepository: FakePortadorCartaoRepository;
let createPortadorCartao: CreatePortadorCartaoService;

describe('CreatePortadorCartao', () => {
  beforeEach(() => {
    fakePortadorCartaoRepository = new FakePortadorCartaoRepository();
    createPortadorCartao = new CreatePortadorCartaoService(fakePortadorCartaoRepository);
  });

  it('should be able to create a new portador cartao', async () => {
    const portador_cartao = await createPortadorCartao.execute({
      pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      name: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      cpf: '994.132.090-06',
      dt_nascimento: new Date(2020, 4, 10, 13),
      phone: '19987894561',
    });

    expect(portador_cartao).toHaveProperty('id');
  });

  it('should be able to create a new portador cartao, without email', async () => {
    const portador_cartao = await createPortadorCartao.execute({
      pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      name: 'Maria Antonia',
      cpf: '994.132.090-06',
      phone: '19987894561',
      dt_nascimento: new Date(2020, 4, 10, 13),
    });

    expect(portador_cartao).toHaveProperty('id');
  });

  it('should not be able to create a new portador cartao with cpf not valid', async () => {
    await expect(
      createPortadorCartao.execute({
        pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
        name: 'Maria Antonia',
        email: 'marai.anotnia@pessoal.com',
        cpf: '123456789',
        dt_nascimento: new Date(2020, 4, 10, 13),
        phone: '19987894561',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
