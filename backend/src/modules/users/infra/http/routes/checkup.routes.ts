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

checkupRouter.post(
  '/photos/find',
  ensureAuthenticated,
  celebrate({
    body: {
      category: Joi.string().required(),
    },
  }),
  checkupController.show,
);

export default checkupRouter;
