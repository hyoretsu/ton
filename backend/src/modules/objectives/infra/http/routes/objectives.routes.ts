import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ObjectivesController from '../controllers/ObjectivesController';
import ProgressController from '../controllers/ProgressController';

const objectivesRouter = Router();
const objectivesController = new ObjectivesController();
const progressController = new ProgressController();

objectivesRouter.get('/', ensureAuthenticated, objectivesController.show);
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

export default objectivesRouter;
