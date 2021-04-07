export default interface ICreatePortadorCartaoDTO {
  pessoa_id: string;
  name: string;
  email?: string;
  cpf: string;
  dt_nascimento: Date;
  phone: string;
}
