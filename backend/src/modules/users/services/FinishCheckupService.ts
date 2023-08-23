import { MailProvider } from '@hyoretsu/providers';
import { differenceInDays, differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICheckupsRepository from '../repositories/ICheckupsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    answers: Record<string, string>;
    createdAt?: Date;
    photos: Express.Multer.File[];
    patientId: string;
}

@injectable()
export default class FinishCheckupService {
    constructor(
        @inject('CheckupsRepository')
        private checkupsRepository: ICheckupsRepository,

        @inject('MailProvider')
        private mailProvider: MailProvider,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ answers, createdAt, photos, patientId }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(patientId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const latestCheckup = await this.checkupsRepository.findLatestCheckup(patientId);
        if (latestCheckup) {
            const latestCheckupDate = new Date(latestCheckup.createdAt);

            // This will avoid creating multiple checkups
            if (
                differenceInDays(new Date(), latestCheckupDate) === 0 &&
                differenceInMinutes(new Date(), latestCheckupDate) < 2
            ) {
                throw new AppError("Checkup's being made too often", 403);
            }
        }

        const checkup = await this.checkupsRepository.create({
            createdAt,
            patientId,
        });

        Object.entries(answers).forEach(async ([question, answer]) => {
            await this.checkupsRepository.registerAnswer({
                checkupId: checkup.id,
                answer,
                question,
            });
        });

        photos.forEach(async photo => {
            await this.checkupsRepository.registerPhoto({
                checkupId: checkup.id,
                category: photo.fieldname,
                fileName: photo.filename,
            });
        });

        const doctor = await this.usersRepository.findDoctorByPatientId(patientId);
        if (!doctor) {
            return;
        }

        await this.mailProvider.sendMail({
            to: doctor.email,
            subject: '[TON] Um paciente acabou de finalizar um checkup',
            body: 'Acesse o painel administrativo para checar as fotos assim que puder.',
        });
    }
}
