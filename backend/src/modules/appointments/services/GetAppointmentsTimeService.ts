import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IGetAppointmentsDTO from '../dtos/IGetAppointmentsDTO';

@injectable()
export default class GetAppointmentsTimeService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ doctorId }: IGetAppointmentsDTO): Promise<Array<number | null>> {
        const user = await this.usersRepository.findById(doctorId);
        if (!user) {
            throw new AppError('Doutor não encontrado.');
        }

        if (user.doctorId !== null) {
            throw new AppError('Este usuário não é um doutor.');
        }

        return [user.appointmentsStart, user.appointmentsEnd];
    }
}
