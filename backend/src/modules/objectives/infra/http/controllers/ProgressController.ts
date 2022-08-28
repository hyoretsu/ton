import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProgressService from '@modules/objectives/services/UpdateProgressService';

export default class ProgressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const updateProgressService = container.resolve(UpdateProgressService);

    const progres = await updateProgressService.execute(body);

    return res.json(progres);
  }
}
