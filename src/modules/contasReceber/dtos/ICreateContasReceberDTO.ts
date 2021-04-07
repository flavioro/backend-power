export default interface ICreateContasReceberDTO {
  pessoa_id: string;

  operadora_id: string;

  total_itens: number;

  total_parcelas: number;

  dt_venda: Date;

  vl_total_original: number;

  dt_receber?: Date;

  vl_receber?: number;

  vl_parcela?: number;

  vl_taxa?: number;

  vl_desconto?: number;

  vl_extra?: number;

  tarifa_intermediacao?: number;

  taxa_intermediacao?: number;

  taxa_parcelamento_cartao?: number;

  origem: string;

  tipo_recebimento: string;

  referencia: string;

  status: string;

  protocolo?: string;

  link_pag?: string;
}
