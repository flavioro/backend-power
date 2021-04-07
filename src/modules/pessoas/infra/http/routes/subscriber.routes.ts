import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SubscriberController from '../controllers/SubscriberController';

const subscriberRouter = Router();
const subscriberController = new SubscriberController();

subscriberRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      tipo_cadastro: Joi.string().required(),
    },
  }),
  subscriberController.create,
);

export default subscriberRouter;
