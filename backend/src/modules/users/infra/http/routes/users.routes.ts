import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    body: {
      birthDate: Joi.date().required(),
      chartNumber: Joi.string().required(),
      city: Joi.string().required(),
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      neoplasia: Joi.string().required(),
      parentName: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string()
        .required()
        .regex(/\d{2}9?\d{8}/),
    },
  }),
  usersController.create,
);

export default usersRouter;
