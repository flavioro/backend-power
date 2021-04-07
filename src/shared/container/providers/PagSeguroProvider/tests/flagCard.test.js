const config = require('./config');
const pagseguro = require('../src');

describe('Get Flag Card', () => {
  it('success', async () => {
    const client = pagseguro.connect(config.pagseguro);
    const session = await client.session.get();
    const response = await client.flagCard.get({
      tk: session.content,
      creditCard: 411111,
    });

    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('status', 'success');
    expect(response).toHaveProperty('content');
    expect(response.content).toHaveProperty('message');
    // expect(Array.isArray(response.content.message.bin)).toEqual(true);
    // console.log(response.content); ok
    // console.log(response.content.message); ok
    // console.log(JSON.parse(response.content.message)); ok
    const flagCard = JSON.parse(response.content.message);
    expect(flagCard).toHaveProperty('bin');
    expect(flagCard.bin.brand).toHaveProperty('name');
    expect(flagCard.bin.brand).toHaveProperty('name', 'visa');
    expect(flagCard.bin).toHaveProperty('bin');
    expect(flagCard.bin).toHaveProperty('bin', 411111);
    expect(flagCard.bin).toHaveProperty('cvvSize');
    expect(flagCard.bin).toHaveProperty('cvvSize', 3);
  });
});
