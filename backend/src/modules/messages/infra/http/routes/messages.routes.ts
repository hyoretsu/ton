import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/', ensureAuthenticated, messagesController.show);
messagesRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            body: Joi.string().required(),
            recipientId: Joi.string().allow(null),
            sequelId: Joi.string().allow(null),
        },
    }),
    messagesController.create,
);

export default messagesRouter;
