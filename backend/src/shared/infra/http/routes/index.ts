import { Router } from 'express';

import objectivesRouter from '@modules/objectives/infra/http/routes/objectives.routes';
import checkupRouter from '@modules/users/infra/http/routes/checkup.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/checkup', checkupRouter);
routes.use('/objectives', objectivesRouter);
routes.use('/users', usersRouter);

export default routes;
