import { DentalPhoto } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import ICheckupsRepository from '../repositories/ICheckupsRepository';

interface IRequest {
    category: string;
    patientId: string;
}

@injectable()
export default class FindPhotosService {
    constructor(
        @inject('CheckupsRepository')
        private checkupsRepository: ICheckupsRepository,
    ) {}

    public async execute({ category, patientId }: IRequest): Promise<DentalPhoto | null> {
        const checkups = await this.checkupsRepository.findCheckups(patientId);
        if (checkups.length === 0) {
            return null;
        }

        const photo = await this.checkupsRepository.findPhoto({
            category,
            checkupId: checkups[checkups.length - 1]?.id,
        });

        return photo;
    }
}
