import { SocketLabsClient } from '@socketlabs/email';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SocketlabsMailProvider implements IMailProvider {
  private client: SocketLabsClient;

  constructor(
    @inject('MailTemplateProvider')
    private MailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = new SocketLabsClient(
      parseInt(process.env.MAIL_SERVER_ID),
      process.env.MAIL_YOUR_API_KEY,
    );
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<any> {
    const html = await this.MailTemplateProvider.parse(templateData);
    let message = await this.client.send({
      to: to.email,
      from: from?.email || 'naoresponder@archshop.com.br',
      subject,
      htmlBody: html,

      // textBody: "This message was sent using the SocketLabs Node.js library!",
      messageType: 'basic',
    });
    message = { ...message, html };
    return message;
  }
}
