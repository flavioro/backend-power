import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePeopleSubscriberService from '@modules/pessoas/services/CreatePeopleSubscriberService';
import SendEmailSubscriberService from '@modules/emails/services/SendEmailSubscriberService';

export default class SubscriberController {
  async create(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line camelcase
    const { email, tipo_cadastro } = request.body;

    const createSubscriber = container.resolve(CreatePeopleSubscriberService);
    const sendEmail = container.resolve(SendEmailSubscriberService);

    const subscriber = await createSubscriber.execute({
      tipo_cadastro,
      email,
    });

    const emailSend = await sendEmail.execute({
      email,
    });

    const merged = { ...subscriber, ...emailSend };
    return response.json(merged);
  }
}
