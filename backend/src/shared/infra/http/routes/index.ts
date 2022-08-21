import { Router } from 'express';

import checkupRouter from '@modules/users/infra/http/routes/checkup.routes';

const routes = Router();

routes.use('/checkup', checkupRouter);

export default routes;
