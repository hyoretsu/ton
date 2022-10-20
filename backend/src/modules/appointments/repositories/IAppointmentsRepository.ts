import { Appointment } from '@prisma/client';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    delete(appointmentId: string): Promise<void>;
    findAll(userId: string): Promise<Appointment[]>;
    findById(appointmentId: string): Promise<Appointment | null>;
    findByTime(time: Date): Promise<Appointment | null>;
}
