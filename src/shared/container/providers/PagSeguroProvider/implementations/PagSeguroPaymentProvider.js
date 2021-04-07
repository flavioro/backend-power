const pagSeguroConfig = require('../../../../../config/pagSeguro');
const PagSeguro = require('../src/index.js');
// const config = require('../tests/config.js');

async function boleto(data) {
  // console.log(pagSeguroConfig.pagseguro);
  const client = PagSeguro.connect(pagSeguroConfig.pagseguro);

  const response = await client.transaction.boleto(data);
  return response;
}

async function token(configPagSeguro) {
  const client = PagSeguro.connect(pagSeguroConfig.pagseguro);

  const session = await client.session.get();

  const tokenReturn = await client.token.get(
    Object.assign(configPagSeguro.card, { sessionId: session.content }),
  );

  return tokenReturn;
}

async function installment(configInstallment) {
  const client = PagSeguro.connect(pagSeguroConfig.pagseguro);

  const response = await client.installment.get(configInstallment);

  return response;
}

async function flagCard(bin) {
  const client = PagSeguro.connect(pagSeguroConfig.pagseguro);
  const session = await client.session.get();

  const response = await client.flagCard.get({
    tk: session.content,
    creditCard: bin,
  });

  return response;
}

async function cartaoCredito(data) {
  const client = PagSeguro.connect(pagSeguroConfig.pagseguro);

  const response = client.transaction.creditCard(data);

  return response;
}

module.exports = {
  boleto,
  token,
  cartaoCredito,
  installment,
  flagCard,
};
