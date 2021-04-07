import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import LandPageController from '../controllers/LandPageController';

const landpageRouter = Router();
const subscriberController = new LandPageController();

landpageRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      tipo_cadastro: Joi.string().required(),
      landPage: Joi.string().required(),
      phone: Joi.string().min(10).required(),
    },
  }),
  subscriberController.create,
);
export default landpageRouter;
