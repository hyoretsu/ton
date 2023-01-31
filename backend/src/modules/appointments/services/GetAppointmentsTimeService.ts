import { differenceInCalendarDays, differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IGetAppointmentsDTO from '../dtos/IGetAppointmentsDTO';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
export default class GetAppointmentTimeService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ date, doctorId }: IGetAppointmentsDTO): Promise<Array<Date | null>> {
        // Trying to make an appointment today or in the past
        if (differenceInCalendarDays(date, new Date()) <= 0) {
            return [null];
        }

        const doctor = await this.usersRepository.findById(doctorId);
        if (!doctor) {
            throw new AppError('Doutor não encontrado.');
        }

        const times: Date[] = [];

        date.setHours(0, 0, 0, 0);

        const existingAppointments = await this.appointmentsRepository.findByDate(date);
        const existingAppointmentsTimes = existingAppointments.map(appointment => appointment.time);

        for (let hours = doctor.appointmentsStart as number; hours < (doctor.appointmentsEnd as number); hours += 0.5) {
            const newTime = new Date(date);
            newTime.setHours(Math.floor(hours), (hours * 60) % 60);

            if (existingAppointmentsTimes.find(time => differenceInMinutes(time, newTime) === 0)) {
                continue;
            }

            times.push(newTime);
        }

        return times;
    }
}
