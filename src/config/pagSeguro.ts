require('dotenv/config');

let debugEnv: boolean;

if (process.env.PAG_SEGURO_DEBUG) {
  debugEnv = /^true$/i.test(process.env.PAG_SEGURO_DEBUG);
} else debugEnv = false;

const pagseguro = {
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

const card = {
  cardNumber: 4111111111111111, // {{ADICIONE O NÚMERO DO CARTÃO}}
  cardBrand: 'VISA', // {{ADICIONE A BANDEIRA DO CARTÃO}}
  cardCvv: '123', // {{ADICIONE O CVV}} Código de segurança do cartão
  cardExpirationMonth: 12, // {{ADICIONE O MÊS DE EXPIRAÇÃO}} 2 dígitos
  cardExpirationYear: 2030,
};

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
  // email: 'ti@archshop.com.br',
  email: 'c46537309654892146172@sandbox.pagseguro.com.br',
  phone: {
    areaCode: '19',
    number: '91510980',
  },
  documents: {
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
  addressRequired: false,
};

const billingAddress = { ...address };

const shipping = {
  ...address,
  type: 1,
  cost: 25.0,
};

const items = {
  item: [
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
  ],
  itemCount: 3,
};

const holder = {
  ...sender,
  birthDate: '22/02/1989',
  senderCPF: '22111944785',
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
        type: 'cpf',
        value: '18974411008',
      },
    ],
    phones: [
      {
        type: 'MOBILE',
        areaCode: '19',
        number: '91510980',
      },
      {
        type: 'HOME',
        areaCode: '19',
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
};

module.exports = {
  authorization,
  pagseguro,
  card,
  accounts,
  person,
  company,
  payment: {
    mode: 'default',
    method: 'creditCard',
    sender,
    bank: {
      name: 'itau',
    },
    creditCard: {
      holder,
      installment,
      maxInstallmentNoInterest: 0,
      token: '',
      billingAddress,
      senderCPF: '22111944785',
    },
    extraAmount: 10.0,
    reference: 'test_pagseguro_nodejs',
    shipping,
    billingAddress,
    // items,
    senderCPF: '22111944785',
  },
  senderCPF: '22111944785',
};
