import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ObjectivesController from '../controllers/ObjectivesController';
import ProgressController from '../controllers/ProgressController';

const objectivesRouter = Router();
const objectivesController = new ObjectivesController();
const progressController = new ProgressController();

objectivesRouter.get('/', objectivesController.show);
objectivesRouter.post(
  '/',
  celebrate({
    body: {
      title: Joi.string().required(),
      goal: Joi.number().required(),
      isDaily: Joi.boolean().required(),
    },
  }),
  objectivesController.create,
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
