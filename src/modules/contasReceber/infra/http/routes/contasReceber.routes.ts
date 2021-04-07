import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ContasReceberController from '../controllers/ContasReceberController';

const contasReceberRouter = Router();
const contasReceberController = new ContasReceberController();

contasReceberRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      bin: Joi.number().min(6).required(),
      vl_total_original: Joi.number().min(3).required(),
    },
  }),
  contasReceberController.create,
);
// contasReceberRouter.get('/', allProjetoController.show);

export default contasReceberRouter;
