import FakePessoasRepository from '@modules/pessoas/repositories/fakes/FakePessoasRepository';
import GetTokenAndPaymentCreditCardService from './GetTokenAndPaymentCreditCardService';

let fakePessoasRepository: FakePessoasRepository;
let creditCardService: GetTokenAndPaymentCreditCardService;

describe('should be able to return sell creditCard CreditCard', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    creditCardService = new GetTokenAndPaymentCreditCardService(
      fakePessoasRepository,
    );
  });

  it('Success Payment', async () => {
    const itens = [
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
    ];

    const pessoa = await fakePessoasRepository.create({
      user_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'Cliente',
      cpf: '99413209006',
      dt_nascimento: new Date(2020, 4, 10, 13),
      country: 'Brasil',
      phone: '19987894561',
      uf: 'SP',
      cidade: 'Holambra',
      cep: '13160000',
      bairro: 'Bairrinho',
      logradouro: 'Rua dos Montes',
      numero_casa: '122',
    });

    // const address = {
    //   street: pessoa.logradouro,
    //   number: Number(pessoa.numero_casa),
    //   complement: pessoa.complemento,
    //   district: pessoa.bairro,
    //   city: pessoa.cidade,
    //   state: pessoa.uf,
    //   country: pessoa.country, //BRA
    //   postalCode: pessoa.cep,
    // };

    const creditCard = await creditCardService.execute({
      cardNumber: 4111111111111111, // {{ADICIONE O NÚMERO DO CARTÃO}}
      cardBrand: 'VISA', // {{ADICIONE A BANDEIRA DO CARTÃO}}
      cardCvv: '123', // {{ADICIONE O CVV}} Código de segurança do cartão
      cardExpirationMonth: 12, // {{ADICIONE O MÊS DE EXPIRAÇÃO}} 2 dígitos
      cardExpirationYear: 2030,
      quantity: 4,
      installmentAmount: 610.22,
      valueTotal: 2370,
      method: 'creditCard',
      itens,
      pessoa_id: pessoa.id,
    });

    expect(creditCard).toHaveProperty('status');
    expect(creditCard.status).toBe('success');
  });
});
