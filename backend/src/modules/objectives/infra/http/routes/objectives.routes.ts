import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

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

objectivesRouter.post(
  '/progress',
  celebrate({
    body: {
      objectiveId: Joi.string().required(),
      userId: Joi.string().required(),
      progress: Joi.number().required(),
    },
  }),
  progressController.create,
);

export default objectivesRouter;
