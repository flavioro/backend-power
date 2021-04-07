/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  pessoa_id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@injectable()
class SendEmailContactSiteService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    email,
    name,
    subject,
    message,
    phone,
  }: IRequest): Promise<any> {
    const emailContactSiteTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'contactSite.hbs',
    );

    const messageSend = await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: '[ArchShop] Bem vindo a Sua Loja de Arquitetura',
      templateData: {
        file: emailContactSiteTemplate,
        variables: {
          name,
          email,
        },
      },
    });

    const emailContactSiteInternal = path.resolve(
      __dirname,
      '..',
      'views',
      'sendContactInternal.hbs',
    );

    const subjectChange = `Contato Site: ${subject}`;
    await this.mailProvider.sendMail({
      to: {
        name: 'Envio automatico',
        email: 'ti@archshop.com.br',
      },
      subject,
      templateData: {
        file: emailContactSiteInternal,
        variables: {
          name,
          email,
          phone,
          subject: subjectChange,
          message,
        },
      },
    });

    return messageSend;
  }
}

export default SendEmailContactSiteService;
