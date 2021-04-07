const PagSeguroPaymentProvider = require('./PagSeguroPaymentProvider.js');

const pagSeguroConfig = require('../../../../../config/pagSeguro');

describe('CreatePagSeguro-Payment', () => {
  it('should be able to create a new sell Credit-card', async () => {
    const token = await PagSeguroPaymentProvider.token(pagSeguroConfig);

    const configInstallment = {
      amount: 2370, // 1680 + 690
      cardBrand: 'visa',
      maxInstallmentNoInterest: 2,
    };

    const installment = await PagSeguroPaymentProvider.installment(
      configInstallment,
    );

    const {
      cardBrand,
      quantity,
      amount,
      totalAmount,
      interestFree,
    } = installment.content[2]; //* *** */ Mude o index para alterar o numero parcelas *******************************
    // console.log('Venda com cartão de crédito no modo Sandbox usando nodejs');
    // console.log('Valores para parcelamento:', 'quantity ', quantity, 'amount ', amount, 'totalAmount ', totalAmount);

    const request = {
      method: 'CREDITCARD',

      // reference: `Tipo CREDITCARD, ${new Date()}, valorTotal ${
      reference: `Tipo CREDITCARD, 21/09/2020 10:35, valorTotal ${configInstallment.amount}`,

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
          description: 'Casa Flórida 109',
          quantity: 1,
          amount: 1680,
        },
        {
          id: 2,
          description: 'Projeto de Interiores',
          quantity: 1,
          amount: 690.0,
        },
      ],

      creditCard: {
        token: token.content.token,

        holder: {
          name: 'Jose Comprador',
          document: {
            type: 'CPF',
            value: 22111944785,
          },
        },
        installment: {
          // cardBrand,
          quantity,
          // amount,
          maxInstallmentNoInterest: 2,
          installmentAmount: amount,
          // totalAmount,
          // interestFree,
          // installmentAmount: totalAmount,

        },
      },
    };

    const vendaCartaoCredito = await PagSeguroPaymentProvider.cartaoCredito(
      request,
    );
    // console.log(vendaCartaoCredito);

    await expect(typeof vendaCartaoCredito).toEqual('object');
    await expect(vendaCartaoCredito).toHaveProperty('content');
    await expect(vendaCartaoCredito).toHaveProperty('statusCode');
    await expect(vendaCartaoCredito.statusCode).toBe(200);
    await expect(vendaCartaoCredito).toHaveProperty('status');
    await expect(vendaCartaoCredito.status).toBe('success');
  });
});
