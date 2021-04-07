/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePeopleContactSiteService from '@modules/pessoas/services/CreatePeopleContactSiteService';
import CreateSiteContatoService from '@modules/pessoas/services/CreateSiteContatoService';

import SendEmailContactSiteService from '@modules/emails/services/SendEmailContactSiteService';
import CreateEmailService from '@modules/emails/services/CreateEmailService';

export default class SiteContatoController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      email,
      tipo_cadastro,
      phone,
      message,
      subject,
    } = request.body;

    const createPeople = container.resolve(CreatePeopleContactSiteService);
    const createContact = container.resolve(CreateSiteContatoService);
    const createEmail = container.resolve(CreateEmailService);
    const sendEmailToContactAndInternal = container.resolve(
      SendEmailContactSiteService,
    );

    const savePeople = await createPeople.execute({
      nome,
      email,
      tipo_cadastro,
      phone,
    });

    const saveContactSite = await createContact.execute({
      pessoa_id: savePeople.id,
      subject,
      message,
    });

    await sendEmailToContactAndInternal.execute({
      pessoa_id: savePeople.id,
      name: savePeople.nome,
      email: savePeople.email,
      phone: savePeople.phone,
      subject: saveContactSite.subject,
      message: saveContactSite.message,
    });

    const saveEmail = await createEmail.execute({
      pessoa_id: savePeople.id,
      subject,
      message_html: message,
      email_from: 'naoresponder@archshop.com.br',
      email_to: email,
      email_send: true,
    });

    const merged = { ...savePeople, ...saveContactSite, ...saveEmail };
    return response.json(merged);
  }
}
