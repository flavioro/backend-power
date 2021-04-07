import { Router } from 'express';

import pessoasRouter from '@modules/pessoas/infra/http/routes/pessoas.routes';
import subscriberRouter from '@modules/pessoas/infra/http/routes/subscriber.routes';
import contactSiteRouter from '@modules/pessoas/infra/http/routes/contactSite.routes';
import landPageRouter from '@modules/pessoas/infra/http/routes/landpage.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sellsRouter from '@modules/sells/infra/http/routes/sellsPortadorCartao.routes';
import projetosRouter from '@modules/projetos/infra/http/routes/projetos.routes';
// import contasReceberRouter from '@modules/contasReceber/infra/http/routes/contasReceber.routes';

const routes = Router();

routes.use('/pessoas', pessoasRouter);
routes.use('/subscriber', subscriberRouter);
routes.use('/contactSite', contactSiteRouter);
routes.use('/landpage', landPageRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/sells', sellsRouter);
routes.use('/projetos', projetosRouter);
// routes.use('/contasReceber', contasReceberRouter);

export default routes;
