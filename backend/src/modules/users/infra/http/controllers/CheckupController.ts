import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindPhotosService from '@modules/users/services/FindPhotosService';
import FinishCheckupService from '@modules/users/services/FinishCheckupService';
import UpdateCheckupService from '@modules/users/services/UpdateCheckupService';

export default class CheckupController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            body: { answers },
            files,
        } = req;

        const FinishCheckup = container.resolve(FinishCheckupService);

        const checkup = await FinishCheckup.execute({
            answers: JSON.parse(answers),
            photos: files as Express.Multer.File[],
            userId: req.user.id,
        });

        return res.json(checkup);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { category } = req.body;

        const findPhotos = container.resolve(FindPhotosService);

        const photos = await findPhotos.execute({ category, patientId: req.user.id });

        return res.json(photos);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const updateCheckup = container.resolve(UpdateCheckupService);

        await updateCheckup.execute(body);

        return res.json();
    }
}
