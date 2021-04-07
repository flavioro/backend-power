/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  pessoa_id: string;
  name: string;
  email: string;
  phone: string;
  landPage: string;
}

@injectable()
class SendEmailLandPageService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    email,
    name,
    phone,
    landPage,
  }: IRequest): Promise<void> {
    // Send LandPage
    const emailLandPageProspect = path.resolve(
      __dirname,
      '..',
      'views',
      'landPage.hbs', // change here ********
    );

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: '[ArchShop] Bem vindo a Sua Loja de Arquitetura',
      templateData: {
        file: emailLandPageProspect,
        variables: {
          name,
        },
      },
    });

    // Send internal
    const emailLandPageInternal = path.resolve(
      __dirname,
      '..',
      'views',
      'sendLandPageInternal.hbs',
    );

    const subjectChange = `LandPage: ${landPage} - ArchShop`;
    const sendContact = await this.mailProvider.sendMail({
      to: {
        name: 'Envio automatico',
        email: 'marketing@archshop.com.br',
      },
      subject: subjectChange,
      templateData: {
        file: emailLandPageInternal,
        variables: {
          name,
          email,
          phone,
          landPage,
        },
      },
    });

    return sendContact;
  }
}

export default SendEmailLandPageService;
