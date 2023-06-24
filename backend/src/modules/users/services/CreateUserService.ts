import { HashProvider } from '@hyoretsu/providers';
import { User } from '@prisma/client';
import { getYear, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: HashProvider,
    ) {}

    public async execute({
        appointmentsEnd,
        appointmentsStart,
        birthDate,
        chartNumber,
        doctorId,
        email,
        name,
        parentName,
        password,
        phoneNumber,
        ...rest
    }: ICreateUserDTO): Promise<User> {
        if (!!appointmentsEnd !== (!!appointmentsStart || appointmentsStart === 0)) {
            throw new AppError('Envie o horário de início e término das consultas.');
        }

        // They must be valid hours
        if (
            appointmentsStart &&
            appointmentsEnd &&
            (appointmentsEnd <= appointmentsStart ||
                Math.min(appointmentsStart, appointmentsEnd) < 0 ||
                Math.max(appointmentsStart, appointmentsEnd) >= 23.5)
        ) {
            throw new AppError('Horário de consultas inválido.');
        }

        if (!isBefore(birthDate, new Date())) {
            throw new AppError('Impossível ter nascido hoje ou no futuro.');
        }
        if (getYear(Date.now()) - getYear(birthDate) > 122) {
            throw new AppError('Data inválida.');
        }

        if (chartNumber) {
            const sameChartNumber = await this.usersRepository.findByChartNumber(chartNumber);

            if (sameChartNumber) {
                throw new AppError('Um paciente com este número de prontuário já foi cadastrado.');
            }
        }

        const sameEmail = await this.usersRepository.findByEmail(email);
        if (sameEmail) {
            throw new AppError('Um paciente com este e-mail já foi cadastrado.');
        }

        const samePhone = await this.usersRepository.findByPhone(phoneNumber);
        if (samePhone) {
            throw new AppError('Um paciente com este celular já foi cadastrado.');
        }

        if (doctorId) {
            const existingDoctor = await this.usersRepository.findById(doctorId);
            if (!existingDoctor) {
                throw new AppError('Este doutor não foi encontrado.');
            }
        }

        password = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            appointmentsEnd,
            appointmentsStart,
            birthDate,
            chartNumber,
            doctorId,
            email,
            name,
            parentName,
            password,
            phoneNumber,
            ...rest,
        });

        return user;
    }
}
