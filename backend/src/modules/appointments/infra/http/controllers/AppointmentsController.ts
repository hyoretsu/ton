import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({ ...body, patientId: req.user.id });

        return res.json(appointment);
    }
}
