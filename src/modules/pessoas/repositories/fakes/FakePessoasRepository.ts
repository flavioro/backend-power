import { uuid } from 'uuidv4';
import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
import ICreatePessoaDTO from '@modules/pessoas/dtos/ICreatePessoaDTO';

import Pessoa from '../../infra/typeorm/entities/Pessoa';

class PessoasRepository implements IPessoasRepository {
  private pessoas: Pessoa[] = [];

  public async findById(id: string): Promise<Pessoa | undefined> {
    const findPessoa = this.pessoas.find(pessoa => pessoa.id === id);

    return findPessoa;
  }

  public async findByCPF(cpf: string): Promise<Pessoa | undefined> {
    const findPessoa = this.pessoas.find(pessoa => pessoa.cpf === cpf);

    return findPessoa;
  }

  public async findByEmail(email: string): Promise<Pessoa | undefined> {
    const findPessoa = this.pessoas.find(pessoa => pessoa.email === email);

    return findPessoa;
  }

  public async create(pessoaData: ICreatePessoaDTO): Promise<Pessoa> {
    const pessoa = new Pessoa();

    Object.assign(pessoa, { id: uuid() }, pessoaData);

    this.pessoas.push(pessoa);

    return pessoa;
  }

  public async save(pessoa: Pessoa): Promise<Pessoa> {
    const findPessoaIndex = this.pessoas.findIndex(
      pessoaIndex => pessoaIndex.id === pessoa.id,
    );

    this.pessoas[findPessoaIndex] = pessoa;

    return pessoa;
  }
}

export default PessoasRepository;
