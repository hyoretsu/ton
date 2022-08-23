import { Router } from 'express';

import checkupRouter from '@modules/users/infra/http/routes/checkup.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/checkup', checkupRouter);
routes.use('/users', usersRouter);

export default routes;
