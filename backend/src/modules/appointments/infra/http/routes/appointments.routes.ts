import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

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

export default appointmentsRouter;
