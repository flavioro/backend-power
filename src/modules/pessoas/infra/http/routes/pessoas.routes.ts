import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PessoasController from '../controllers/PessoasController';

const pessoasRouter = Router();
const pessoasController = new PessoasController();

// pessoasRouter.use(ensureAuthenticated);

pessoasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      tipo_cadastro: Joi.string().required(),
      cpf: Joi.string().min(11).required(),
      dt_nascimento: Joi.date().max('12-31-2003'),
      country: Joi.string().min(3).required(),
      phone: Joi.string().min(10).required(),
      uf: Joi.string().min(2).required(),
      cidade: Joi.string().min(4).required(),
      cep: Joi.string().min(8),
      bairro: Joi.string().min(4).required(),
      logradouro: Joi.string().min(4).required(),
      numero_casa: Joi.string().min(1).required(),
      complemento: Joi.string(),
    },
  }),
  pessoasController.create,
);

export default pessoasRouter;
