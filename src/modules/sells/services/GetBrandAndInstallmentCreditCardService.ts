import PagSeguroProvider from '@shared/container/providers/PagSeguroProvider/implementations/PagSeguroPaymentProvider';

require('dotenv/config');

interface IInstallmentRequest {
  bin: number;
  amount: number;
  // cardBrand: string;
  // maxInstallmentNoInterest: number;
}

interface IInstallmentResponse {
  bin: number;
  cardBrand: string;
  quantity: number;
  amount: number;
  totalAmount: number;
}

class GetBrandAndInstallmentCreditCardService {
  public async execute({
    bin,
    amount,
  }: IInstallmentRequest): Promise<IInstallmentResponse[]> {
    // 1 - GetBrand - flagCard
    // 2 - Return installments
    const flagCard = await PagSeguroProvider.flagCard(bin);
    // console.log(flagCard);

    const parseBin = JSON.parse(flagCard.content.message); // Err this line, need to speak Support PagSeguro

    const cardBrand = parseBin.bin.brand.name;
    const maxInstallmentNoInterest = Number(
      process.env.PAG_SEGURO_MAX_INSTALLMENT_NO_INTEREST,
    );

    const installments = await PagSeguroProvider.installment({
      amount,
      cardBrand,
      maxInstallmentNoInterest,
    });

    return installments.content;
  }
}

export default GetBrandAndInstallmentCreditCardService;
