import PortadorCartao from '../infra/typeorm/entities/PortadorCartao';
import ICreatePortadorCartaoDTO from '../dtos/ICreatePortadorCartaoDTO';

export default interface IPortadorCartaoRepository {
  findByCPF(cpf: string): Promise<PortadorCartao | undefined>;
  findByEmail(email: string): Promise<PortadorCartao | undefined>;
  findByIdPessoa(pessoa_id: string): Promise<PortadorCartao | undefined>;
  create(data: ICreatePortadorCartaoDTO): Promise<PortadorCartao>;
  save(portadorCartao: PortadorCartao): Promise<PortadorCartao>;
}
