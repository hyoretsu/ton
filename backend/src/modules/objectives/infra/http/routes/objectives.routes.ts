import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import NotificationsController from '../controllers/NotificationsController';
import ObjectivesController from '../controllers/ObjectivesController';
import ProgressController from '../controllers/ProgressController';

const objectivesRouter = Router();
const notificationsController = new NotificationsController();
const objectivesController = new ObjectivesController();
const progressController = new ProgressController();

objectivesRouter.get('/', objectivesController.show);
objectivesRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            title: Joi.string().required(),
            goal: Joi.number().required(),
            time: Joi.number(),
            isDaily: Joi.boolean().required(),
        },
    }),
    objectivesController.create,
);
objectivesRouter.put(
    '/',
    ensureAuthenticated,
    celebrate({
        body: {
            info: Joi.object().required(),
            objectiveId: Joi.string().uuid().required(),
        },
    }),
    objectivesController.update,
);

objectivesRouter.get('/notifications', notificationsController.show);
objectivesRouter.delete('/notifications/:id', ensureAuthenticated, notificationsController.delete);

objectivesRouter.get('/progress', ensureAuthenticated, progressController.show);
objectivesRouter.post(
    '/progress',
    ensureAuthenticated,
    celebrate({
        body: {
            objectiveId: Joi.string().required(),
            progress: Joi.number().required(),
        },
    }),
    progressController.create,
);

objectivesRouter.get('/:id', objectivesController.show);
objectivesRouter.delete('/:id', ensureAuthenticated, objectivesController.delete);

objectivesRouter.get('/:id/notifications', notificationsController.show);
objectivesRouter.post(
    '/:id/notifications',
    ensureAuthenticated,
    celebrate({
        body: {
            patientId: Joi.string().allow(''),
            times: Joi.array().items(Joi.date()).required(),
        },
    }),
    notificationsController.create,
);

export default objectivesRouter;
