import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FinishCheckupService from '@modules/users/services/FinishCheckupService';
import ListCheckupsService from '@modules/users/services/ListCheckupsService';
import UpdateCheckupService from '@modules/users/services/UpdateCheckupService';

export default class CheckupController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            body: { answers, patientId },
            files,
        } = req;

        const FinishCheckup = container.resolve(FinishCheckupService);

        const checkup = await FinishCheckup.execute({
            answers: answers ? JSON.parse(answers) : {},
            photos: files as Express.Multer.File[],
            patientId: patientId || req.user.id,
        });

        return res.json(checkup);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const findPhotos = container.resolve(ListCheckupsService);

        const photos = await findPhotos.execute((req.query.patientId as string) || req.user.id);

        return res.json(photos);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const updateCheckup = container.resolve(UpdateCheckupService);

        await updateCheckup.execute(body);

        return res.json();
    }
}
