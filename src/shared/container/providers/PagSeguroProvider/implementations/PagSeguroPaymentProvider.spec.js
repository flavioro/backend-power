const PagSeguroPaymentProvider = require('./PagSeguroPaymentProvider.js');

const pagSeguroConfig = require('../../../../../config/pagSeguro');

const pagseguro = require('../src');

describe('CreatePagSeguro-Installment-Credit_Card', () => {
  it('success Installment', async () => {
    const client = pagseguro.connect(pagSeguroConfig.pagseguro);

    const response = await client.installment.get({
      amount: 30.0,
      cardBrand: 'visa',
      maxInstallmentNoInterest: 2,
    });

    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('status', 'success');
    expect(response).toHaveProperty('content');
    expect(Array.isArray(response.content)).toEqual(true);
  });

  it('success Installment from Provider', async () => {
    const configInstallment = {
      amount: 30.0,
      cardBrand: 'visa',
      maxInstallmentNoInterest: 2,
    };

    const response = await PagSeguroPaymentProvider.installment(
      configInstallment,
    );

    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('status', 'success');
    expect(response).toHaveProperty('content');
    expect(Array.isArray(response.content)).toEqual(true);
  });
});
