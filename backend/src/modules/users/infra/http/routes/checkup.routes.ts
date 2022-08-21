import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CheckupController from '../controllers/CheckupController';

const checkupRouter = Router();
const checkupController = new CheckupController();

const upload = multer(uploadConfig.multer);

checkupRouter.post('/', upload.any(), checkupController.create);

export default checkupRouter;
