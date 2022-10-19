import { Progress } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IProgressRepository from '../repositories/IProgressRepository';

@injectable()
export default class ListProgressesService {
    constructor(
        @inject('ProgressRepository')
        private progressRepository: IProgressRepository,
    ) {}

    public async execute(userId: string): Promise<Progress[]> {
        const progresses = await this.progressRepository.findAll(userId);

        return progresses;
    }
}
