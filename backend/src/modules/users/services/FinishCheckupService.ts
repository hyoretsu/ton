import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';

import ICheckupsRepository from '../repositories/ICheckupsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    answers: Record<string, string>;
    photos: Express.Multer.File[];
    userId: string;
}

@injectable()
export default class FinishCheckupService {
    constructor(
        @inject('CheckupsRepository')
        private checkupsRepository: ICheckupsRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ answers, photos, userId }: IRequest): Promise<void> {
        const checkup = await this.checkupsRepository.create({
            patientId: userId,
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

        const doctor = await this.usersRepository.findDoctorByPatientId(userId);
        if (!doctor) {
            return;
        }

        await this.mailProvider.sendMail({
            to: {
                email: doctor.email,
                name: doctor.name,
            },
            subject: '[TON] Um paciente acabou de finalizar um checkup',
            body: 'Acesse o painel administrativo para checar as fotos assim que puder.',
        });
    }
}
