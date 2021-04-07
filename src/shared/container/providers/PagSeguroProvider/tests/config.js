const pagseguro = {
  email: 'financeiro@archshop.com.br',
  token: '914C9DB3D10F4395B55EDDE7FECA3A79',
  //   email: "v47947642349752039826@sandbox.pagseguro.com.br",
  //   token: "PUBE408852470F54A0BB08FA96C04A9B9CF",
  appId: 'app9513284614',
  appKey: '3514BF1BEFEFA31334C6DFA55BDAF9D0',
  env: 'sandbox',
  // env: 'production',
  log: __dirname + '/log/pagseguro.log',
  debug: false,
  notificationURL: '',
  redirectURL: 'https://www.archshop.com.br/compra/finalizado.html',
};

const card = {
  cardNumber: 4111111111111111, // {{ADICIONE O NÚMERO DO CARTÃO}}
  cardBrand: 'VISA', // {{ADICIONE A BANDEIRA DO CARTÃO}}
  cardCvv: '123', // {{ADICIONE O CVV}} Código de segurança do cartão
  cardExpirationMonth: 12, // {{ADICIONE O MÊS DE EXPIRAÇÃO}} 2 dígitos
  cardExpirationYear: 2030,
};

/**
 * @link https://sandbox.pagseguro.uol.com.br/aplicacao/configuracoes.html
 */
const accounts = [
  {
    name: 'Vendedor 01',
    email: 'financeiro@archshop.com.br',
    password: '',
    publicKey: '914C9DB3D10F4395B55EDDE7FECA3A79',
  },
  {
    name: 'Vendedor 02',
    email: '',
    password: '',
    publicKey: '',
  },
];

const sender = {
  name: 'Willy Chagas',
  email: 'c46537309654892146172@sandbox.pagseguro.com.br',
  phone: {
    areaCode: '48',
    number: '91510980',
  },
  document: {
    type: 'CPF',
    value: '18974411008',
  },
};

const address = {
  street: 'Av João Lima',
  number: 55,
  complement: 'Casa',
  district: 'Campeche',
  city: 'Florianopolis',
  state: 'SC',
  country: 'BRA',
  postalCode: '88063333',
};

const billing = { ...address };

const shipping = {
  ...address,
  type: 1,
  cost: 25.0,
};

const items = [
  {
    id: 1,
    description: 'Produto 1',
    quantity: 2,
    amount: 2,
  },
  {
    id: 2,
    description: 'Produto 2',
    quantity: 1,
    amount: 60.0,
  },
  {
    id: 3,
    description: 'Produto 3',
    quantity: 2,
    amount: 20.0,
  },
];

const holder = {
  ...sender,
  birthDate: '22/02/1989',
};

const installment = {
  installmentAmount: 124,
  interestFree: true,
  quantity: 1,
  totalAmount: 124.0,
};

const person = {
  email: accounts[0].email,
  type: 'SELLER',
  person: {
    name: accounts[0].name,
    documents: [
      {
        type: 'CPF',
        value: '18974411008',
      },
    ],
    phones: [
      {
        type: 'MOBILE',
        areaCode: '48',
        number: '91510980',
      },
      {
        type: 'HOME',
        areaCode: '48',
        number: '32091243',
      },
    ],
    address,
  },
};

const company = {
  email: accounts[1].email,
  type: 'COMPANY',
  company: {
    name: accounts[1].name,
    displayName: 'Atah Digital',
    websiteURL: 'http://atah.com.br',
    documents: [
      {
        type: 'CNPJ',
        value: '17302417000101',
      },
    ],
    partner: {
      name: 'Willy Chagas',
      documents: [
        {
          type: 'CPF',
          value: '18974411008',
        },
      ],
      birthDate: '22/02/1989',
    },
    phones: [
      {
        type: 'BUSINESS',
        areaCode: '48',
        number: '91510980',
      },
      {
        type: 'BUSINESS',
        areaCode: '48',
        number: '32091243',
      },
    ],
    address,
  },
};

const authorization = {
  permissions: [
    'CREATE_CHECKOUTS',
    'SEARCH_TRANSACTIONS',
    'RECEIVE_TRANSACTION_NOTIFICATIONS',
    'MANAGE_PAYMENT_PRE_APPROVALS',
    'DIRECT_PAYMENT',
  ],

  redirecURL: 'http://domain.com',
  notificationURL: 'http://domain.com',
};

module.exports = {
  authorization,
  pagseguro,
  card,
  accounts,
  person,
  company,
  payment: {
    bank: {
      name: 'itau',
    },
    creditCard: {
      holder,
      installment,
      maxInstallmentNoInterest: 0,
      token: '',
    },
    extraAmount: 10.0,
    reference: 'test_pagseguro_nodejs',
    sender,
    shipping,
    billing,
    items,
  },
};
