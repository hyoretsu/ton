import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CheckupController from '../controllers/CheckupController';
import CheckupPhotosController from '../controllers/CheckupPhotosController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const checkupRouter = Router();
const checkupController = new CheckupController();
const checkupPhotosController = new CheckupPhotosController();

const upload = multer(uploadConfig.multer);

checkupRouter.get(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            patientId: Joi.string(),
        },
    }),
    checkupController.show,
);
checkupRouter.post(
    '/',
    ensureAuthenticated,
    upload.any(),
    celebrate({
        body: {
            // answers: Joi.object().required(),
            answers: Joi.string(),
            createdAt: Joi.string(),
            patientId: Joi.string(),
        },
    }),
    checkupController.create,
);
checkupRouter.patch(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            answers: Joi.object().required(),
            checkupId: Joi.string().uuid().required(),
        },
    }),
    checkupController.update,
);
checkupRouter.delete(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            checkupId: Joi.string().uuid(),
        },
    }),
    checkupController.delete,
);

checkupRouter.post(
    '/photos/find',
    ensureAuthenticated,
    celebrate({
        body: {
            category: Joi.string().required(),
        },
    }),
    checkupPhotosController.show,
);

export default checkupRouter;
