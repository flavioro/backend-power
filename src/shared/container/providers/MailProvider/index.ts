import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

// import EtherealMailProvider from './implementations/EtherealMailProvider';
import SocketlabsMailProvider from './implementations/SocketlabsMailProvider';

const providers = {
  // ethereal: container.resolve(EtherealMailProvider),
  socketlabs: container.resolve(SocketlabsMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  // providers[mailConfig.driver],
  providers.socketlabs,
);
