const config = require('./config');
const pagseguro = require('../src');
const date = require('../../../../tools/date');

describe('Transaction', () => {
  const client = pagseguro.connect(config.pagseguro);

  it('creditCard', async () => {
    const session = await client.session.get();

    const token = await client.token.get(
      Object.assign(config.card, { sessionId: session.content }),
    );

    const installment = await client.installment.get({
      amount: 2370,
      cardBrand: 'visa',
      maxInstallmentNoInterest: 3,
    });

    const {
      cardBrand,
      quantity,
      amount,
      totalAmount,
      interestFree,
    } = installment.content[3];

    const request = {
      method: 'CREDITCARD',

      // reference: `Tipo CREDITCARD, 23/09/2020 10:35, valorTotal ${amount}`,
      reference: `Tipo CREDITCARD, ${date.dateAndHoursNowFormatted}, valorTotal ${totalAmount}`,

      sender: {
        // name: 'Willy Chagas',
        name: 'Maria Antonia',
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
          // name: 'Jose Comprador',
          name: 'Maria Antonia',
          document: {
            type: 'CPF',
            value: 22111944785,
          },
        },
        installment: {
          quantity,

          // amount,
          // value: amount,

          maxInstallmentNoInterest: 3,
          // noInterestInstallmentQuantity: 3,
          installmentAmount: amount,

          // installmentValue: amount,
          // interestFree,
        },
        // {"interestFree":false,"quantity":5,"totalValue":2476.89,"installmentAmount":495.38,"installmentValue":495.38,"totalAmount":2476.89},
      },
    };

    const sellCredtiCard = await client.transaction.creditCard(request);
    // console.log(sellCredtiCard);

    await expect(typeof sellCredtiCard).toEqual('object');
    await expect(sellCredtiCard).toHaveProperty('content');
    await expect(sellCredtiCard).toHaveProperty('statusCode');
    await expect(sellCredtiCard.statusCode).toBe(200);
    await expect(sellCredtiCard).toHaveProperty('status');
    await expect(sellCredtiCard.status).toBe('success');
  });
});
