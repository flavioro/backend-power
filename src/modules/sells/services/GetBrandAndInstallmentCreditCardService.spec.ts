import GetBrandAndInstallmentCreditCardService from './GetBrandAndInstallmentCreditCardService';

let getBrandAndInstallmentCreditCardService: GetBrandAndInstallmentCreditCardService;

describe('should be able to return Brand and installments CreditCard', () => {
  beforeEach(() => {
    getBrandAndInstallmentCreditCardService = new GetBrandAndInstallmentCreditCardService();
  });

  it('Success brand and maxInstallmentNoInterest', async () => {
    const amount = 2370;

    const installments = await getBrandAndInstallmentCreditCardService.execute({
      bin: 411111,
      amount,
    });

    // console.log(installments);

    expect(installments[0]).toHaveProperty('cardBrand');
    expect(installments[0].cardBrand).toBe('visa');
    expect(installments[0]).toHaveProperty('quantity');
    expect(installments[0].quantity).toBe(1);
    expect(installments[0]).toHaveProperty('amount');
    expect(installments[0].amount).toBe(amount);
  });
});
