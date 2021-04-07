export default interface ICreateContasReceberItemDTO {
  contas_receber_id: string;

  produto_id: string;

  tipo_produto: string;

  ordem_item?: number;

  descricao_item: string;

  valor_item: number;

  dt_receber?: Date;

  vl_receber?: number;
}
