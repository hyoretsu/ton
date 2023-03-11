import { Checkup } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import ICheckupsRepository from '../repositories/ICheckupsRepository';

@injectable()
export default class ListCheckupsService {
    constructor(
        @inject('CheckupsRepository')
        private checkupsRepository: ICheckupsRepository,
    ) {}

    public async execute(patientId: string): Promise<(Checkup | null)[]> {
        const checkups = await this.checkupsRepository.findCheckups(patientId);

        return checkups;
    }
}
