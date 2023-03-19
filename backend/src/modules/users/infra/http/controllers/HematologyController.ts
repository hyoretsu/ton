import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHematologyService from '@modules/users/services/ListHematologyService';

export default class HematologyController {
    public async show(req: Request, res: Response): Promise<Response> {
        const listHematologyService = container.resolve(ListHematologyService);

        const hematology = await listHematologyService.execute(req.user.id);

        return res.json(hematology);
    }
}
