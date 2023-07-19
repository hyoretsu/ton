import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICheckupsRepository from '../repositories/ICheckupsRepository';

@injectable()
export default class DeleteCheckupService {
    constructor(
        @inject('CheckupsRepository')
        private checkupsRepository: ICheckupsRepository,
    ) {}

    public async execute(checkupId: string): Promise<void> {
        const checkup = await this.checkupsRepository.findById(checkupId);
        if (!checkup) {
            throw new AppError('Esse exame não existe');
        }

        await this.checkupsRepository.delete(checkupId);
    }
}
