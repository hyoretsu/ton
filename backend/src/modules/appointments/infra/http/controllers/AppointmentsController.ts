import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CancelAppointmentService from '@modules/appointments/services/CancelAppointmentService';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class AppointmentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({ ...body, patientId: req.user.id });

        return res.json(appointment);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { appointmentId } = req.body;

        const cancelAppointment = container.resolve(CancelAppointmentService);

        await cancelAppointment.execute(appointmentId);

        return res.json();
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const listAppointments = container.resolve(ListAppointmentsService);

        const appointments = await listAppointments.execute(req.user.id);

        return res.json(appointments);
    }
}
