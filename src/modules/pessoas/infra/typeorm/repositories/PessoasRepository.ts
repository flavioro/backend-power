/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
import ICreatePessoaDTO from '@modules/pessoas/dtos/ICreatePessoaDTO';

import Pessoa from '../entities/Pessoa';

class PessoasRepository implements IPessoasRepository {
  private ormRepository: Repository<Pessoa>;

  constructor() {
    this.ormRepository = getRepository(Pessoa);
  }

  public async findById(id: string): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne(id);

    return pessoa;
  }

  public async findByCPF(cpf: string): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne({
      where: { cpf },
    });

    return pessoa;
  }

  public async findByEmail(email: string): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne({
      where: { email },
    });

    return pessoa;
  }

  public async create({
    user_id,
    nome,
    email,
    tipo_cadastro,
    landPage,
    cpf,
    dt_nascimento,
    country,
    phone,
    uf,
    cidade,
    cep,
    bairro,
    logradouro,
    numero_casa,
    complemento,
  }: ICreatePessoaDTO): Promise<Pessoa> {
    const pessoa = this.ormRepository.create({
      user_id,
      nome,
      email,
      tipo_cadastro,
      landPage,
      cpf,
      dt_nascimento,
      country,
      phone,
      uf,
      cidade,
      cep,
      bairro,
      logradouro,
      numero_casa,
      complemento,
    });

    await this.ormRepository.save(pessoa);

    return pessoa;
  }

  public async save(pessoa: Pessoa): Promise<Pessoa> {
    return this.ormRepository.save(pessoa);
  }
}

export default PessoasRepository;
