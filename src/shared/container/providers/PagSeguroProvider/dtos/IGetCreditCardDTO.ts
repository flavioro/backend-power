export default interface IGetCreditCardDTO {
  cardNumber: number;
  cardBrand: string; // Bandeira
  cardCvv: string; // {{ADICIONE O CVV}} Código de segurança do cartão
  cardExpirationMonth: number; // {{ADICIONE O MÊS DE EXPIRAÇÃO}} 2 dígitos
  cardExpirationYear: number;
};
