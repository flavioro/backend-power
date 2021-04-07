/* eslint-disable object-curly-newline */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePeopleLandPageService from '@modules/pessoas/services/CreatePeopleLandPageService';
import SendEmailLandPageService from '@modules/emails/services/SendEmailLandPageService';

export default class LandPageController {
  async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, phone, tipo_cadastro, landPage } = request.body;

    const createPeopleLandPage = container.resolve(CreatePeopleLandPageService);
    const sendEmail = container.resolve(SendEmailLandPageService);

    const savePeopleLandPage = await createPeopleLandPage.execute({
      nome,
      phone,
      tipo_cadastro,
      email,
      landPage,
    });

    await sendEmail.execute({
      pessoa_id: savePeopleLandPage.id,
      email,
      name: nome,
      phone,
      landPage,
    });

    const merged = { ...savePeopleLandPage };
    return response.json(merged);
  }
}
