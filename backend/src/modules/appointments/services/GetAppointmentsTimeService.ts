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
        const user = await this.usersRepository.findById(doctorId);
        if (!user) {
            throw new AppError('Doutor não encontrado.');
        }

        const times: Date[] = [];

        if (differenceInCalendarDays(date, new Date()) > 0) {
            date.setHours(0, 0, 0, 0);

            for (let hours = user.appointmentsStart as number; hours < (user.appointmentsEnd as number); hours += 0.5) {
                const newTime = new Date(date);
                newTime.setHours(Math.floor(hours), (hours * 60) % 60);

                times.push(newTime);
            }
        }

        return times;
    }
}
