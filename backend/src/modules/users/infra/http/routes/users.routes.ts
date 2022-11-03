import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const sessionsController = new SessionsController();

usersRouter.get('/', ensureAuthenticated, usersController.show);
usersRouter.post(
    '/',
    celebrate({
        body: {
            birthDate: Joi.date().required(),
            chartNumber: Joi.string().required(),
            city: Joi.string().required(),
            doctorId: Joi.string().uuid(),
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            neoplasia: Joi.string().required(),
            parentName: Joi.string().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string()
                .required()
                .regex(/\d{2}9?\d{8}/),
        },
    }),
    usersController.create,
);
usersRouter.patch(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            appointmentsStart: Joi.number().min(0).max(23.5),
            appointmentsEnd: Joi.number().min(0).max(23.5),
            city: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            phoneNumber: Joi.string().regex(/\d{2}9?\d{8}/),
        },
    }),
    usersController.update,
);
usersRouter.delete(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            userId: Joi.string().uuid().required(),
        },
    }),
    usersController.delete,
);
usersRouter.post(
    '/login',
    celebrate({
        body: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.create,
);

export default usersRouter;
