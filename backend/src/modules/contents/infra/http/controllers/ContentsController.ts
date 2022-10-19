import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContentService from '@modules/contents/services/CreateContentService';
import ListContentsService from '@modules/contents/services/ListContentsService';

export default class ContentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const createContent = container.resolve(CreateContentService);

        const content = await createContent.execute(body);

        return res.json(content);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const listContentsService = container.resolve(ListContentsService);

        const content = await listContentsService.execute(req.headers.authorization);

        return res.json(content);
    }
}
