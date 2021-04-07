const PagSeguroPaymentProvider = require('./PagSeguroPaymentProvider.js');

describe('GetBrandPagSeguro-Credit_Card', () => {
  it('success flagCard', async () => {
    const bin = 411111;

    const response = await PagSeguroPaymentProvider.flagCard(bin);

    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('status', 'success');
    expect(response).toHaveProperty('content');
    // expect(Array.isArray(response.content)).toEqual(true);
  });
});
