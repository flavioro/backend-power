import AppError from '@shared/errors/AppError';

import FakePessoasRepository from '../repositories/fakes/FakePessoasRepository';
import CreatePessoaService from './CreatePessoaService';

let fakePessoasRepository: FakePessoasRepository;
let createPessoa: CreatePessoaService;

describe('CreatePessoa', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    createPessoa = new CreatePessoaService(fakePessoasRepository);
  });

  it('should be able to create a new people, contact site', async () => {
    const pessoa = await createPessoa.execute({
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'contatosite',
      phone: '19987894561',
    });

    expect(pessoa).toHaveProperty('id');
  });

  it('should be able to create a new people, subscriber', async () => {
    const pessoa = await createPessoa.execute({
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'inscrito',
    });

    expect(pessoa).toHaveProperty('id');
  });

  it('should not be able to create a new peolple with type register not valid', async () => {
    await expect(
      createPessoa.execute({
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'inscrit', // word invalid
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new people', async () => {
    const pessoa = await createPessoa.execute({
      user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '994.132.090-06',
      dt_nascimento: new Date(2020, 4, 10, 13),
      country: 'Brasil',
      phone: '19987894561',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
    });

    expect(pessoa).toHaveProperty('id');
  });

  it('should be able to create a new people, without dt-born, complement and people-id', async () => {
    const pessoa = await createPessoa.execute({
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '994.132.090-06',
      country: 'Brasil',
      phone: '19987894561',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
    });

    expect(pessoa).toHaveProperty('id');
  });

  it('should not be able to create a new client with cpf not valid', async () => {
    await expect(
      createPessoa.execute({
        user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
        nome: 'Maria Antonia',
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'Cliente',
        cpf: '123456789',
        dt_nascimento: new Date(2020, 4, 10, 13),
        country: 'Brasil',
        phone: '19987894561',
        uf: 'SP',
        cidade: 'Holambra',
        cep: '13160000',
        bairro: 'Bairrinho',
        logradouro: 'Rua dos Montes',
        numero_casa: '122',
        complemento: 'vazio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client with same cpf from another', async () => {
    await createPessoa.execute({
      user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '994.132.090-06',
      dt_nascimento: new Date(2020, 4, 10, 13),
      country: 'Brasil',
      phone: '19987894561',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
      complemento: 'vazio',
    });

    await expect(
      createPessoa.execute({
        user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
        nome: 'Maria Antonia',
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'Cliente',
        cpf: '994.132.090-06',
        dt_nascimento: new Date(2020, 4, 10, 13),
        country: 'Brasil',
        phone: '19987894561',
        uf: 'SP',
        cidade: 'Holambra',
        cep: '13160000',
        bairro: 'Bairrinho',
        logradouro: 'Rua dos Montes',
        numero_casa: '122',
        complemento: 'vazio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create and store a new client without dots and lines in the cpf ', async () => {
    const pessoa = await createPessoa.execute({
      user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '994.132.090-06',
      dt_nascimento: new Date(2020, 4, 10, 13),
      country: 'Brasil',
      phone: '19987894561',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
    });

    expect(pessoa).toHaveProperty('id');
    expect(pessoa.cpf).toBe('99413209006');
  });

  it('should be able to create and store a new client only numbers in the phone ', async () => {
    const pessoa = await createPessoa.execute({
      user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '994.132.090-06',
      dt_nascimento: new Date(2020, 4, 10, 13),
      country: 'Brasil',
      phone: '(19)-987 894 56.1',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
    });

    expect(pessoa).toHaveProperty('id');
    expect(pessoa.phone).toBe('19987894561');
  });

  it('should not be able to create a new client with only phone numbers less than 10', async () => {
    await expect(
      createPessoa.execute({
        user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
        nome: 'Maria Antonia',
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'Cliente',
        cpf: '780.429.790-45',
        dt_nascimento: new Date(2020, 4, 10, 13),
        country: 'Brasil',
        phone: '( )-987 894 56.1',
        uf: 'SP',
        cidade: 'Holambra',
        cep: '13160000',
        bairro: 'Bairrinho',
        logradouro: 'Rua dos Montes',
        numero_casa: '122',
        complemento: 'vazio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client with same email from another', async () => {
    await createPessoa.execute({
      user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '994.132.090-06',
      dt_nascimento: new Date(2020, 4, 10, 13),
      country: 'Brasil',
      phone: '19987894561',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
      complemento: 'vazio',
    });

    await expect(
      createPessoa.execute({
        user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
        nome: 'Maria Antonia',
        email: 'marai.anotnia@pessoal.com',
        tipo_cadastro: 'Cliente',
        cpf: '780.429.790-45',
        dt_nascimento: new Date(2020, 4, 10, 13),
        country: 'Brasil',
        phone: '19987894561',
        uf: 'SP',
        cidade: 'Holambra',
        cep: '13160000',
        bairro: 'Bairrinho',
        logradouro: 'Rua dos Montes',
        numero_casa: '122',
        complemento: 'vazio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
