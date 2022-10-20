import { Appointment } from '@prisma/client';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { prisma } from '@shared/infra/http/server';

export default class AppointmentsRepository implements IAppointmentsRepository {
    public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = await prisma.appointment.create({ data });

        return appointment;
    }

    public async findByTime(time: Date): Promise<Appointment | null> {
        const appointment = await prisma.appointment.findFirst({
            where: { time },
        });

        return appointment;
    }
}
