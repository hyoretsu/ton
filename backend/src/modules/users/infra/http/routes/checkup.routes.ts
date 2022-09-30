import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CheckupController from '../controllers/CheckupController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const checkupRouter = Router();
const checkupController = new CheckupController();

const upload = multer(uploadConfig.multer);

checkupRouter.post(
  '/',
  ensureAuthenticated,
  upload.any(),
  celebrate({
    body: {
      // answers: Joi.object().required(),
      answers: Joi.string().required(),
    },
  }),
  checkupController.create,
);

export default checkupRouter;
