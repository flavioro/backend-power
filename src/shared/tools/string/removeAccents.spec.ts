import removeAccents_ from './removeAccents';

describe('should be able to return string without accents', () => {
  it('Success remove accents', async () => {
    const removeAccents = removeAccents_('Á á â Ã Â ì Í Í');

    expect(removeAccents).toEqual('A a a A A i I I');
    expect(removeAccents).toContain('i I');
  });

  it('Success string void', async () => {
    const removeAccents = removeAccents_('');

    expect(removeAccents).toEqual('');
  });
});
