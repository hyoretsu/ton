import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindPhotosService from '@modules/users/services/FindPhotosService';

export default class CheckupPhotosController {
    public async show(req: Request, res: Response): Promise<Response> {
        const { category } = req.body;

        const findPhotos = container.resolve(FindPhotosService);

        const photos = await findPhotos.execute({ category, patientId: req.user.id });

        return res.json(photos);
    }
}
