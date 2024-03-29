import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import HematologyController from '../controllers/HematologyController';
import MedicineController from '../controllers/MedicineController';
import PeriodicInfoController from '../controllers/PeriodicInfoController';
import SessionsController from '../controllers/SessionsController';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const medicineController = new MedicineController();
const hematologyController = new HematologyController();
const periodicInfoController = new PeriodicInfoController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

usersRouter.get('/', ensureAuthenticated, usersController.show);
usersRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            appointmentsStart: Joi.number().min(0).max(23.5),
            appointmentsEnd: Joi.number().min(0).max(23.5),
            birthDate: Joi.date().required(),
            chartNumber: Joi.string(),
            city: Joi.string().required(),
            doctorId: Joi.string().uuid(),
            email: Joi.string().email().required(),
            hematology: Joi.object(),
            medicine: Joi.array().items(Joi.object()),
            name: Joi.string().required(),
            neoplasia: Joi.string(),
            parentName: Joi.string(),
            password: Joi.string().required(),
            phoneNumber: Joi.string()
                .required()
                .regex(/\d{2}9?\d{8}/),
            treatment: Joi.string(),
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
            chartNumber: Joi.string(),
            city: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            phoneNumber: Joi.string().regex(/\d{2}9?\d{8}/),
            treatment: Joi.string(),
            userId: Joi.string(),
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
usersRouter.post(
    '/forgot_password',
    celebrate({
        body: {
            email: Joi.string().required(),
        },
    }),
    forgotPasswordController.create,
);

usersRouter.get('/hematology', ensureAuthenticated, hematologyController.show);

usersRouter.get('/medicine', ensureAuthenticated, medicineController.show);

usersRouter.post(
    '/periodic_info',
    celebrate({
        body: {
            patientId: Joi.string().required(),
            hematology: Joi.object().required(),
            medicine: Joi.array().items(Joi.object()).required(),
            medicineEnd: Joi.date().required(),
        },
    }),
    periodicInfoController.create,
);

export default usersRouter;
