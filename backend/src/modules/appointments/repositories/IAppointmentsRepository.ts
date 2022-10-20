import { Appointment } from '@prisma/client';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findAll(userId: string): Promise<Appointment[]>;
    findByTime(time: Date): Promise<Appointment | null>;
}
