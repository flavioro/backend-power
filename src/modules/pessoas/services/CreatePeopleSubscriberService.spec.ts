import AppError from '@shared/errors/AppError';

import FakePessoasRepository from '../repositories/fakes/FakePessoasRepository';
import CreateSubsriberService from './CreatePeopleSubscriberService';

let fakePessoasRepository: FakePessoasRepository;
let createPessoa: CreateSubsriberService;

describe('CreatePeopleSubscriber', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    createPessoa = new CreateSubsriberService(fakePessoasRepository);
  });

  it('should be able to create a new subscriber', async () => {
    const pessoa = await createPessoa.execute({
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'inscrito',
    });

    expect(pessoa).toHaveProperty('id');
  });

  it('should not be able to create a new subscriber with type register invalid', async () => {
    await expect(
      createPessoa.execute({
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'inscrit', // word invalid
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new subscriber with type register subscriber', async () => {
    await expect(
      createPessoa.execute({
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'subscriber', // word invalid
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
