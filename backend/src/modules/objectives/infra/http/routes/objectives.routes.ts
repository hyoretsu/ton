import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ObjectivesController from '../controllers/ObjectivesController';

const objectivesRouter = Router();
const objectivesController = new ObjectivesController();

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

export default objectivesRouter;
