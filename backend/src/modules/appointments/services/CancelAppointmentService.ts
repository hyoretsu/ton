import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
export default class CancelAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        const existingAppointment = await this.appointmentsRepository.findById(id);
        if (!existingAppointment) {
            throw new AppError('Este agendamento não existe.');
        }

        await this.appointmentsRepository.delete(id);
    }
}
