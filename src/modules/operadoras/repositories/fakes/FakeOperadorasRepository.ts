import { uuid } from 'uuidv4';

import IOperadorasRepository from '@modules/operadoras/repositories/IOperadorasRepository';
import ICreateOperadoraDTO from '@modules/operadoras/dtos/ICreateOperadoraDTO';

import Operadora from '../../infra/typeorm/entities/Operadora';

class FakeOperadorasRepository implements IOperadorasRepository {
  private operadoras: Operadora[] = [];

  public async findById(id: string): Promise<Operadora | undefined> {
    const findOperadora = this.operadoras.find(
      operadora => operadora.id === id,
    );

    return findOperadora;
  }

  public async findByName(name: string): Promise<Operadora | undefined> {
    const findOperadora = this.operadoras.find(
      operadora => operadora.operadora === name,
    );

    return findOperadora;
  }

  public async create(operadoraData: ICreateOperadoraDTO): Promise<Operadora> {
    const operadora = new Operadora();

    Object.assign(operadora, { id: uuid() }, operadoraData);

    this.operadoras.push(operadora);

    return operadora;
  }

  public async save(operadora: Operadora): Promise<Operadora> {
    const findOperadoraIndex = this.operadoras.findIndex(
      operadoraIndex => operadoraIndex.id === operadora.id,
    );

    this.operadoras[findOperadoraIndex] = operadora;

    return operadora;
  }
}

export default FakeOperadorasRepository;
