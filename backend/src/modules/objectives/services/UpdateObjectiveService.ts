import { Objective } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IObjectivesRepository from '../repositories/IObjectivesRepository';

interface IRequest {
    info: Objective;
    objectiveId: string;
}

@injectable()
export default class UpdateObjectiveService {
    constructor(
        @inject('ObjectivesRepository')
        private objectivesRepository: IObjectivesRepository,
    ) {}

    public async execute({ info, objectiveId }: IRequest): Promise<Objective> {
        const existingObjective = await this.objectivesRepository.findById(objectiveId);
        if (!existingObjective) {
            throw new AppError('O objetivo informado não existe.');
        }

        const objective = await this.objectivesRepository.update(existingObjective.id, info);

        return objective;
    }
}
