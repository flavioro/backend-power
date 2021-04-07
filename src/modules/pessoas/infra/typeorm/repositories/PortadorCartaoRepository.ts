import { getRepository, Repository } from 'typeorm';

import IPortadorCartaoRepository from '@modules/pessoas/repositories/IPortadorCartaoRepository';
import ICreatePortadorCartaoDTO from '@modules/pessoas/dtos/ICreatePortadorCartaoDTO';

import PortadorCartao from '../entities/PortadorCartao';

class PortadorCartaoRepository implements IPortadorCartaoRepository {
  private ormRepository: Repository<PortadorCartao>;

  constructor() {
    this.ormRepository = getRepository(PortadorCartao);
  }

  public async findByIdPessoa(pessoa_id: string): Promise<PortadorCartao | undefined> {
    const portadorCartao = await this.ormRepository.findOne(pessoa_id);

    return portadorCartao;
  }

  public async findByCPF(cpf: string): Promise<PortadorCartao | undefined> {
    const portadorCartao = await this.ormRepository.findOne({
      where: { cpf },
    });

    return portadorCartao;
  }

  public async findByEmail(email: string): Promise<PortadorCartao | undefined> {
    const portadorCartao = await this.ormRepository.findOne({
      where: { email },
    });

    return portadorCartao;
  }

  public async create({
    pessoa_id,
    name,
    email,
    cpf,
    dt_nascimento,
    phone,
  }: ICreatePortadorCartaoDTO): Promise<PortadorCartao> {
    const portadorCartao = this.ormRepository.create({
      pessoa_id,
      name,
      email,
      cpf,
      dt_nascimento,
      phone,
    });

    await this.ormRepository.save(portadorCartao);

    return portadorCartao;
  }

  public async save(portadorCartao: PortadorCartao): Promise<PortadorCartao> {
    return this.ormRepository.save(portadorCartao);
  }
}

export default PortadorCartaoRepository;
