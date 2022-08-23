import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FinishCheckupService from '@modules/users/services/FinishCheckupService';

export default class CheckupController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body, files } = req;

    const FinishCheckup = container.resolve(FinishCheckupService);

    const checkup = await FinishCheckup.execute({
      photos: files as Express.Multer.File[],
      userId: body.userId,
    });

    return res.json(checkup);
  }
}
