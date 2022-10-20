import { Appointment } from '@prisma/client';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByTime(time: Date): Promise<Appointment | null>;
}
