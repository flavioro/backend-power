import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ProjetoController from '../controllers/ProjetoController';
import AllProjetoController from '../controllers/AllProjetoController';

const projetosRouter = Router();
const projetoController = new ProjetoController();
const allProjetoController = new AllProjetoController();

projetosRouter.post('/', projetoController.create);
// projetosRouter.get('/', projetoController.show);
projetosRouter.get('/', allProjetoController.show);

export default projetosRouter;
