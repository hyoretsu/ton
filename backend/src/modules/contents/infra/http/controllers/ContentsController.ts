import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContentService from '@modules/contents/services/CreateContentService';

export default class ContentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const createContent = container.resolve(CreateContentService);

    const content = await createContent.execute(body);

    return res.json(content);
  }
}
