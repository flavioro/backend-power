/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendEmailContactSiteService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<any> {
    const emailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'subscriberEmail.hbs',
    );

    const emailSend = await this.mailProvider.sendMail({
      to: {
        name: '',
        email,
      },
      subject: '[ArchShop] Bem vindo a Sua Loja de Arquitetura',
      templateData: {
        file: emailTemplate,
        variables: {
          email,
        },
      },
    });

    return emailSend;
  }
}

export default SendEmailContactSiteService;
