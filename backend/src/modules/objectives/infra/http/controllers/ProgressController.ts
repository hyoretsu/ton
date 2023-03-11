import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProgressService from '@modules/objectives/services/ListProgressService';
import UpdateProgressService from '@modules/objectives/services/UpdateProgressService';

export default class ProgressController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const updateProgressService = container.resolve(UpdateProgressService);

        const progress = await updateProgressService.execute({ ...body, userId: req.user.id });

        return res.json(progress);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const listProgressService = container.resolve(ListProgressService);

        const progress = await listProgressService.execute((req.query.userId as string) || req.user.id);

        return res.json(progress);
    }
}
