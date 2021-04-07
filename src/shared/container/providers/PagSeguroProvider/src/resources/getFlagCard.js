// https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk={{ADICIONE O ID DE SESSÃO}}&creditCard={{ADICIONE O BIN DO CARTÃO}}
const request = require('request-promise');
const config = require('../config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PagseguroError = require('../Error');

const get = async (opts, { ...params }) => {
  opts.qs = {
    ...opts.qs,
    ...params,
  };

  try {
    const response = await request({
      ...opts,
      url: `${opts.base.cards}/${config.flagCard}`,
      method: 'GET',
    });

    // console.log(response.content);
    // const contentObj = response.content;
    // console.log(contentObj[0]);
    // console.log(contentObj[0].message);
    // console.log(contentObj);
    // console.log({ contentObj });
    // console.log({response.content});
    // console.log(response.content.message);
    // console.log(response.content.bin);
    return {
      ...response,
      content: response.content[0] ? response.content[0] : [],
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

module.exports = {
  get,
};
