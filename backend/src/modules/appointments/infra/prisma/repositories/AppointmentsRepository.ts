import { Appointment } from '@prisma/client';
import { format } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { prisma } from '@shared/infra/http/server';

export default class AppointmentsRepository implements IAppointmentsRepository {
    public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = await prisma.appointment.create({ data });

        return appointment;
    }

    public async delete(appointmentId: string): Promise<void> {
        await prisma.appointment.delete({ where: { id: appointmentId } });
    }

    public async findAll(id: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { OR: [{ doctorId: id }, { patientId: id }] },
            orderBy: {
                time: 'asc',
            },
        });

        return appointments;
    }

    public async findByDate(date: Date): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: {
                time: {
                    gte: date,
                    lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                },
            },
        });

        return appointments;
    }

    public async findById(id: string): Promise<Appointment | null> {
        const appointment = await prisma.appointment.findUnique({
            where: { id },
        });

        return appointment;
    }

    public async findByTime(time: Date): Promise<Appointment | null> {
        const appointment = await prisma.appointment.findFirst({
            where: { time },
        });

        return appointment;
    }
}
