import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteCheckupService from '@modules/users/services/DeleteCheckupService';
import FinishCheckupService from '@modules/users/services/FinishCheckupService';
import ListCheckupsService from '@modules/users/services/ListCheckupsService';
import UpdateCheckupService from '@modules/users/services/UpdateCheckupService';

export default class CheckupController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            body: { answers, createdAt, patientId },
            files,
        } = req;

        const FinishCheckup = container.resolve(FinishCheckupService);

        await FinishCheckup.execute({
            answers: answers ? JSON.parse(answers) : {},
            createdAt: new Date(createdAt),
            photos: files as Express.Multer.File[],
            patientId: patientId || req.user.id,
        });

        return res.json();
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const {
            body: { checkupId },
        } = req;

        const deleteCheckup = container.resolve(DeleteCheckupService);

        await deleteCheckup.execute(checkupId);

        return res.json();
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const findPhotos = container.resolve(ListCheckupsService);

        const photos = await findPhotos.execute((req.query.patientId || req.user.id) as string);

        return res.json(photos);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const updateCheckup = container.resolve(UpdateCheckupService);

        await updateCheckup.execute(body);

        return res.json();
    }
}
