import { Router } from 'express';

import contentsRouter from '@modules/contents/infra/http/routes/contents.routes';
import messagesRouter from '@modules/messages/infra/http/routes/messages.routes';
import objectivesRouter from '@modules/objectives/infra/http/routes/objectives.routes';
import checkupRouter from '@modules/users/infra/http/routes/checkup.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/contents', contentsRouter);
routes.use('/checkup', checkupRouter);
routes.use('/messages', messagesRouter);
routes.use('/objectives', objectivesRouter);
routes.use('/users', usersRouter);

export default routes;
