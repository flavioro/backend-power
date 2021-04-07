/* eslint-disable camelcase */
export default interface ICreatePessoaDTO {
  ativo?: boolean;
  user_id?: string;
  nome?: string;
  email: string;
  tipo_cadastro: string;
  landPage?: string;
  cpf?: string;
  dt_nascimento?: Date;
  country?: string;
  phone?: string;
  uf?: string;
  cidade?: string;
  cep?: string;
  bairro?: string;
  logradouro?: string;
  numero_casa?: string;
  complemento?: string;
}
