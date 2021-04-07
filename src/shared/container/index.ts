import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IOperadorasRepository from '@modules/operadoras/repositories/IOperadorasRepository';
import OperadorasRepository from '@modules/operadoras/infra/typeorm/repositories/OperadorasRepository';

import IContasReceberRepository from '@modules/contasReceber/repositories/IContasReceberRepository';
import ContasReceberRepository from '@modules/contasReceber/infra/typeorm/repositories/ContasReceberRepository';

import IContasReceberItemRepository from '@modules/contasReceber/repositories/IContasReceberItemRepository';
import ContasReceberItensRepository from '@modules/contasReceber/infra/typeorm/repositories/ContasReceberItensRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
import PessoasRepository from '@modules/pessoas/infra/typeorm/repositories/PessoasRepository';

import ISiteContactRepository from '@modules/pessoas/repositories/ISiteContatoRepository';
import SiteContactsRepository from '@modules/pessoas/infra/typeorm/repositories/SiteContatoRepository';

import IEmailRepository from '@modules/emails/repositories/IEmailRepository';
import EmailRepository from '@modules/emails/infra/typeorm/repositories/EmailRepository';

import IPortadorCartaoRepository from '@modules/pessoas/repositories/IPortadorCartaoRepository';
import PortadorCartaoRepository from '@modules/pessoas/infra/typeorm/repositories/PortadorCartaoRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IProjetosRepository from '@modules/projetos/repositories/IProjetosRepository';
import ProjetosRepository from '@modules/projetos/infra/typeorm/repositories/ProjetosRepository';

container.registerSingleton<IOperadorasRepository>(
  'OperadorasRepository',
  OperadorasRepository,
);

container.registerSingleton<IContasReceberRepository>(
  'ContasReceberRepository',
  ContasReceberRepository,
);

container.registerSingleton<IContasReceberItemRepository>(
  'ContasReceberItensRepository',
  ContasReceberItensRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPessoasRepository>(
  'PessoasRepository',
  PessoasRepository,
);

container.registerSingleton<ISiteContactRepository>(
  'SiteContactsRepository',
  SiteContactsRepository,
);

container.registerSingleton<IEmailRepository>(
  'EmailRepository',
  EmailRepository,
);

container.registerSingleton<IPortadorCartaoRepository>(
  'PortadorCartaoRepository',
  PortadorCartaoRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IProjetosRepository>(
  'ProjetosRepository',
  ProjetosRepository,
);
