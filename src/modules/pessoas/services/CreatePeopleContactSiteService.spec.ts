import AppError from '@shared/errors/AppError';

import FakePessoasRepository from '../repositories/fakes/FakePessoasRepository';
import CreatePessoaService from './CreatePeopleContactSiteService';

let fakePessoasRepository: FakePessoasRepository;
let createPessoa: CreatePessoaService;

describe('CreatePeopleContactSite', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    createPessoa = new CreatePessoaService(fakePessoasRepository);
  });

  // it('should not be able to create a new people contact site with type register "cliente"', async () => {
  //   await expect(
  //     createPessoa.execute({
  //       nome: 'Jonh Silva',
  //       email: 'marai.anotnia@pessoal.com',
  //       tipo_cadastro: 'cliente',
  //       phone: '19987894561',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  // it('should be able to create a new people, contact site with type register "inscrito" already existing', async () => {
  //   await fakePessoasRepository.create({
  //     email: 'marai.anotnia@pessoal.com',
  //     tipo_cadastro: 'inscrito',
  //   });
  //   const pessoa = await createPessoa.execute({
  //     nome: 'Maria Antonia',
  //     email: 'marai.anotnia@pessoal.com',
  //     tipo_cadastro: 'contatosite',
  //     phone: '19987894561',
  //   });

  //   expect(pessoa).toHaveProperty('id');
  // });

  // it('should be able to create a new people, contact site', async () => {
  //   const pessoa = await createPessoa.execute({
  //     nome: 'Maria Antonia',
  //     email: 'marai.anotnia@pessoal.com',
  //     tipo_cadastro: 'contatosite',
  //     phone: '19987894561',
  //   });

  //   expect(pessoa).toHaveProperty('id');
  // });

  it('should not be able to create a new people "contact site" with type register "inscrito" and was not saved', async () => {
    await fakePessoasRepository.create({
      email: 'jonh@pessoal.com',
      tipo_cadastro: 'inscrito',
    });

    // const pessoa =
    await expect(
      createPessoa.execute({
        nome: 'Jonh Silva',
        email: 'jonh@pessoal.com',
        tipo_cadastro: 'inscrito',
        phone: '19987894561',
      }),
    ).rejects.toBeInstanceOf(AppError);

    // expect(pessoa).toHaveProperty('id');
  });
});
