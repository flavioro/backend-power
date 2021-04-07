import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PortadorAndInstallmentsCreditCardController from '../controllers/PortadorAndInstallmentsCreditCardController';
import SellsCreditCardController from '../controllers/SellsCreditCardController';
import InstallmentsCreditCardController from '../controllers/InstallmentsCreditCardController';

const sellsRouter = Router();
const installmentsCreditCardController = new InstallmentsCreditCardController();

const portadorInstallmentsController = new PortadorAndInstallmentsCreditCardController();
const sellsCreditCardController = new SellsCreditCardController();

sellsRouter.post(
  '/creditCardInstallments',
  celebrate({
    [Segments.BODY]: {
      bin: Joi.string().min(6).required(),
      vl_total_original: Joi.number().min(3).required(),
    },
  }),
  installmentsCreditCardController.create,
);

sellsRouter.post(
  '/creditCardPortador',
  celebrate({
    [Segments.BODY]: {
      pessoa_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      cpf: Joi.string().min(11).required(),
      dt_nascimento: Joi.date().max('12-31-2003'),
      phone: Joi.string().min(10).required(),
      bin: Joi.string().min(6).required(),
      vl_total_original: Joi.number().min(3).required(),
    },
  }),
  portadorInstallmentsController.create,
);

sellsRouter.post(
  '/creditCardSell',
  celebrate({
    [Segments.BODY]: {
      cardNumber: Joi.string().min(16).required(),
      cardBrand: Joi.string().required(),
      cardCvv: Joi.string().min(3).required(),
      cardExpirationMonth: Joi.number().min(2).required(),
      cardExpirationYear: Joi.number().min(4).required(),

      quantity: Joi.number().required(),
      installmentAmount: Joi.number().required(),
      valueTotal: Joi.number().min(2).required(),

      method: Joi.string().default('creditCard').required(),
      pessoa_id: Joi.string().uuid().required(),
      operadora: Joi.string()
        .default('PagSeguro')
        .required()
        .valid('PagSeguro', 'Paypall'),

      itens: Joi.array().items({
        id: Joi.string().uuid().required(),
        description: Joi.string().min(5).required(),
        quantity: Joi.number().min(1).required(),
        amount: Joi.number().min(2).required(),
        tipo_produto: Joi.string()
          .default('Incluso')
          .required()
          .valid('Incluso', 'Opcional'),
      }),
    },
  }),
  sellsCreditCardController.create,
);

export default sellsRouter;
