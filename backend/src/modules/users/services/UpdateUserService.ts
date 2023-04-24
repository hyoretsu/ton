import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    appointmentsStart?: number;
    appointmentsEnd?: number;
    city?: string;
    doctorId?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    userId: string;
}

@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        appointmentsStart,
        appointmentsEnd,
        doctorId,
        password,
        userId,
        ...data
    }: IRequest): Promise<User> {
        const existingUser = await this.usersRepository.findById(userId);
        if (!existingUser) {
            throw new AppError('Este usuário não existe.');
        }

        if (doctorId) {
            const existingDoctor = await this.usersRepository.findById(doctorId);
            if (!existingDoctor) {
                throw new AppError('Este médico não existe.');
            }

            if (existingUser.doctorId !== existingDoctor.id) {
                throw new AppError('Você não pode editar o paciente de outro médico.');
            }
        }

        if (
            (appointmentsStart || appointmentsEnd) &&
            (appointmentsEnd || (existingUser.appointmentsEnd as number)) <=
                (appointmentsStart || (existingUser.appointmentsStart as number))
        ) {
            throw new AppError('Horário de consultas inválido.');
        }

        if (password) password = await this.hashProvider.generateHash(password);

        const updatedUser = await this.usersRepository.update(userId, {
            ...data,
            appointmentsEnd,
            appointmentsStart,
            password,
        });

        return updatedUser;
    }
}
