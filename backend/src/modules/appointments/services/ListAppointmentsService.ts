import { Appointment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
export default class ListAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute(id: string): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAll(id);

        return appointments;
    }
}
