require('dotenv/config');

const AppError = require('../../../../errors/AppError');
const PagSeguroPaymentProvider = require('./PagSeguroPaymentProvider.js');

describe('CreatePagSeguro-Payment', () => {
  let debugEnv;

  if (process.env.PAG_SEGURO_DEBUG) {
    debugEnv = /^true$/i.test(process.env.PAG_SEGURO_DEBUG);
  } else debugEnv = false;

  const pagseguroLocal = {
    email: process.env.PAG_SEGURO_EMAIL,
    token: process.env.PAG_SEGURO_TOKEN,
    appId: process.env.PAG_SEGURO_APP_ID,
    appKey: process.env.PAG_SEGURO_APP_KEY,
    env: process.env.PAG_SEGURO_ENV,
    log: process.env.PAG_SEGURO_LOG,
    debug: debugEnv,
    notificationURL: process.env.PAG_SEGURO_NOTIFICATION_URL,
    redirectURL: process.env.PAG_SEGURO_REDIRECT_URL,
  };

  const cardLocal = {
    cardNumber: 4111111111111111, // {{ADICIONE O NÚMERO DO CARTÃO}}
    cardBrand: 'VISA', // {{ADICIONE A BANDEIRA DO CARTÃO}}
    cardCvv: '123', // {{ADICIONE O CVV}} Código de segurança do cartão
    cardExpirationMonth: 12, // {{ADICIONE O MÊS DE EXPIRAÇÃO}} 2 dígitos
    cardExpirationYear: 2030,
  };

  const config = {
    pagseguro: pagseguroLocal,
    card: cardLocal,
  };

  it('should be able to create a new token', async () => {
    const token = await PagSeguroPaymentProvider.token(config);

    expect(typeof token).toEqual('object');
    expect(token).toHaveProperty('content');
    expect(token.content).toHaveProperty('token');
    expect(token.content.token).toHaveLength(32);
    expect(token).toHaveProperty('statusCode');
    expect(token.statusCode).toBe(200);
    expect(token).toHaveProperty('status');
    expect(token.status).toBe('success');
  });

  it('should not be able to create a new token', async () => {
    const configPagSeg = config;
    delete configPagSeg.card.cardNumber;

    const token = await PagSeguroPaymentProvider.token(configPagSeg);

    expect(typeof token).toEqual('object');
    expect(token).toHaveProperty('content');
    expect(token.content).toBeUndefined();
  });
});
