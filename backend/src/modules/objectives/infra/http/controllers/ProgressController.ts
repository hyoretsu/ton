import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProgressesService from '@modules/objectives/services/ListProgressesService';
import UpdateProgressService from '@modules/objectives/services/UpdateProgressService';

export default class ProgressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const updateProgressService = container.resolve(UpdateProgressService);

    const progress = await updateProgressService.execute({ ...body, userId: req.user.id });

    return res.json(progress);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;

    const listProgressesService = container.resolve(ListProgressesService);

    const progresses = await listProgressesService.execute(userId);

    return res.json(progresses);
  }
}
