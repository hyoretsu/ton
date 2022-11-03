import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAppointmentsTimeService from '@modules/appointments/services/GetAppointmentsTimeService';

export default class TimesController {
    public async show(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const getAppointmentsTime = container.resolve(GetAppointmentsTimeService);

        const time = await getAppointmentsTime.execute(body);

        return res.json(time);
    }
}
