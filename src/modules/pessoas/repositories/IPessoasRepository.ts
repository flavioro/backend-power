import Pessoa from '../infra/typeorm/entities/Pessoa';
import ICreatePessoaDTO from '../dtos/ICreatePessoaDTO';

export default interface IPessoasRepository {
  findByCPF(cpf: string): Promise<Pessoa | undefined>;
  findByEmail(email: string): Promise<Pessoa | undefined>;
  findById(id: string): Promise<Pessoa | undefined>;
  create(data: ICreatePessoaDTO): Promise<Pessoa>;
  save(pessoa: Pessoa): Promise<Pessoa>;
}
