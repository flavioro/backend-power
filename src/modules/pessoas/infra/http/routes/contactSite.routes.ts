import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SiteContatoController from '../controllers/SiteContatoController';

const contactSiteRouter = Router();
const contactSiteController = new SiteContatoController();

contactSiteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      tipo_cadastro: Joi.string().required(),
      phone: Joi.string().min(10).required(),
      subject: Joi.string().min(3).required(),
      message: Joi.string().min(10).required(),
    },
  }),
  contactSiteController.create,
);

export default contactSiteRouter;
