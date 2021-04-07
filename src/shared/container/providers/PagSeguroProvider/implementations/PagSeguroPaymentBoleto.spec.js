const PagSeguroPaymentProvider = require('./PagSeguroPaymentProvider.js');

describe('CreatePagSeguro-Payment', () => {
  it('should be able to create a new sell boleto', async () => {
    const request = {
      method: 'BOLETO',

      extraAmount: 10.0,

      reference: 'test_pagseguro_nodejs',

      sender: {
        name: 'Willy Chagas',
        email: 'c46537309654892146172@sandbox.pagseguro.com.br',

        phone: {
          areaCode: 48,
          number: 91510980,
        },

        document: {
          type: 'CPF',
          value: 18974411008,
        },
      },

      billing: {
        street: 'Av João Lima',
        number: 55,
        complement: 'Casa',
        district: 'Campeche',
        city: 'Florianopolis',
        state: 'SC',
        country: 'BRA',
        postalCode: '88063333',
      },

      items: [
        {
          id: 1,
          description: 'Produto 1,',
          quantity: 2,
          amount: 2,
        },
        {
          id: 2,
          description: 'Produto 2',
          quantity: 1,
          amount: 60,
        },
      ],
    };

    const pagSeguroReturn = await PagSeguroPaymentProvider.boleto(request);

    expect(pagSeguroReturn).toHaveProperty('statusCode');
    expect(pagSeguroReturn.statusCode).toBe(200);
    expect(pagSeguroReturn).toHaveProperty('status');
    expect(pagSeguroReturn.status).toBe('success');
    expect(pagSeguroReturn).toHaveProperty('content');
    expect(pagSeguroReturn.content).toHaveProperty('paymentLink');
    expect(pagSeguroReturn.content.paymentLink).toContain('https://sandbox.pagseguro.uol.com.br/checkout/payment/booklet/print.jhtml?');
  });
});
