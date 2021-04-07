import { uuid } from 'uuidv4';
import IPortadorCartaoRepository from '@modules/pessoas/repositories/IPortadorCartaoRepository';
import ICreatePortadorCartaoDTO from '@modules/pessoas/dtos/ICreatePortadorCartaoDTO';

import PortadorCartao from '../../infra/typeorm/entities/PortadorCartao';

class PortadorCartaoRepository implements IPortadorCartaoRepository {
  private portadoresCartoes: PortadorCartao[] = [];

  public async findByIdPessoa(pessoa_id: string): Promise<PortadorCartao | undefined> {
    const findPortador = this.portadoresCartoes.find(
      portador_cartao => portador_cartao.pessoa_id === pessoa_id,
    );

    return findPortador;
  }

  public async findByCPF(cpf: string): Promise<PortadorCartao | undefined> {
    const findPortador = this.portadoresCartoes.find(
      portador_cartao => portador_cartao.cpf === cpf,
    );

    return findPortador;
  }

  public async findByEmail(email: string): Promise<PortadorCartao | undefined> {
    const findPortador = this.portadoresCartoes.find(
      portador_cartao => portador_cartao.email === email,
    );

    return findPortador;
  }

  public async create(portador_cartao_Data: ICreatePortadorCartaoDTO): Promise<PortadorCartao> {
    const portador_cartao = new PortadorCartao();

    Object.assign(portador_cartao, { id: uuid() }, portador_cartao_Data);

    this.portadoresCartoes.push(portador_cartao);

    return portador_cartao;
  }

  public async save(portador_cartao: PortadorCartao): Promise<PortadorCartao> {
    const findPortadorCartaoIndex = this.portadoresCartoes.findIndex(
      portadorCartaoIndex => portadorCartaoIndex.id === portador_cartao.id,
    );

    this.portadoresCartoes[findPortadorCartaoIndex] = portador_cartao;

    return portador_cartao;
  }
}

export default PortadorCartaoRepository;
