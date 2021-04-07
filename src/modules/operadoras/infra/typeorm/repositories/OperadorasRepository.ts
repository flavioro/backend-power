import { getRepository, Repository } from 'typeorm';

import IOperadorasRepository from '@modules/operadoras/repositories/IOperadorasRepository';
import ICreateOperadoraDTO from '@modules/operadoras/dtos/ICreateOperadoraDTO';

import Operadora from '../entities/Operadora';

class OperadoraRepository implements IOperadorasRepository {
  private ormRepository: Repository<Operadora>;

  constructor() {
    this.ormRepository = getRepository(Operadora);
  }

  public async findByName(operadora: string): Promise<Operadora | undefined> {
    const operadoraFind = await this.ormRepository.findOne({
      where: { operadora },
    });

    return operadoraFind;
  }

  public async findById(id: string): Promise<Operadora | undefined> {
    const operadora = await this.ormRepository.findOne(id);

    return operadora;
  }

  public async create({
    name,
    valor_fixo,
    taxa_vista,
    taxa_parcelamento,
  }: ICreateOperadoraDTO): Promise<Operadora> {
    const operadora = this.ormRepository.create({
      name,
      valor_fixo,
      taxa_vista,
      taxa_parcelamento
    });

    await this.ormRepository.save(operadora);

    return operadora;
  }

  public async save(operadora: Operadora): Promise<Operadora> {
    return this.ormRepository.save(operadora);
  }
}

export default OperadoraRepository;
