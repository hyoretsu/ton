import { MailProvider } from '@hyoretsu/providers';
import { Appointment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
export default class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('MailProvider')
        private mailProvider: MailProvider,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ doctorId, patientId, time }: ICreateAppointmentDTO): Promise<Appointment> {
        if (doctorId === patientId) {
            throw new AppError('Você não pode marcar uma consulta com você mesmo.');
        }

        time.setMinutes(time.getMinutes(), 0, 0);
        const existingAppointment = await this.appointmentsRepository.findByTime(time);
        if (existingAppointment) {
            throw new AppError('Já existe um agendamento neste horário.');
        }

        const existingDoctor = await this.usersRepository.findById(doctorId);
        if (!existingDoctor) {
            throw new AppError('O médico informado não existe.');
        }

        const existingPatient = await this.usersRepository.findById(patientId);
        if (!existingPatient) {
            throw new AppError('O paciente informado não existe.');
        }

        const appointment = await this.appointmentsRepository.create({
            doctorId,
            patientId,
            time,
        });

        await this.mailProvider.sendMail({
            to: existingDoctor.email,
            subject: '[TON] Um paciente marcou uma nova consulta',
            body: `Olá doutor!\n\n Seu paciente ${existingPatient.name} acabou de agendar uma nova consulta com você.`,
        });

        return appointment;
    }
}
