import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import TimesController from '../controllers/TimesController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const timesController = new TimesController();

appointmentsRouter.get('/', ensureAuthenticated, appointmentsController.list);
appointmentsRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            doctorId: Joi.string().uuid().required(),
            time: Joi.date().required(),
        },
    }),
    appointmentsController.create,
);
appointmentsRouter.delete(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            appointmentId: Joi.string().uuid().required(),
        },
    }),
    appointmentsController.delete,
);

appointmentsRouter.post(
    '/times/find',
    ensureAuthenticated,
    celebrate({
        body: {
            date: Joi.date().required(),
            doctorId: Joi.string().uuid().required(),
        },
    }),
    timesController.show,
);

export default appointmentsRouter;
