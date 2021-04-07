import type from './validationItemEnum';
import enumTypeRegister from '../../../@types/enumCadastro';

describe('Valid Enum enumCadastro ', () => {
  it('Success type Register', async () => {
    expect(type.isValidItemEnum('Funciário', enumTypeRegister)).toBeFalsy();
    expect(type.isValidItemEnum('FUNCIONARIO', enumTypeRegister)).toBeTruthy();
    expect(type.isValidItemEnum('123', enumTypeRegister)).toBeFalsy();
  });

  it('Success type Register argument empty ', async () => {
    const removeAccents = type.isValidItemEnum('', enumTypeRegister);
    expect(removeAccents).toBeFalsy();
  });
});
