import { inject, injectable } from 'tsyringe';

import ICheckupsRepository from '../repositories/ICheckupsRepository';

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
    }
}
