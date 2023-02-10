import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ContentsController from '../controllers/ContentsController';

const contentsRouter = Router();
const contentsController = new ContentsController();

contentsRouter.get('/', contentsController.show);
contentsRouter.post(
    '/',
    celebrate({
        body: {
            answers: Joi.array().items(Joi.string()).required(),
            condition: Joi.number().required(),
            messages: Joi.array().items(Joi.string()).required(),
            title: Joi.string().required(),
        },
    }),
    contentsController.create,
);

export default contentsRouter;
