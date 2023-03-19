import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePeriodicInfoControllerService from '@modules/users/services/UpdatePeriodicInfoControllerService';

export default class PeriodicInfoController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { patientId, ...periodicInfo } = req.body;

        const updatePeriodicInfoControllerService = container.resolve(UpdatePeriodicInfoControllerService);

        await updatePeriodicInfoControllerService.execute({ patientId, periodicInfo });

        return res.json();
    }
}
