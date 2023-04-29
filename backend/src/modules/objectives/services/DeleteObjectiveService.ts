import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IDeleteObjectiveDTO from '../dtos/IDeleteObjectiveDTO';
import IObjectivesRepository from '../repositories/IObjectivesRepository';

@injectable()
export default class DeleteObjectiveService {
    constructor(
        @inject('ObjectivesRepository')
        private objectivesRepository: IObjectivesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ objectiveId, userId }: IDeleteObjectiveDTO): Promise<void> {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new AppError('This user does not exist.');
        }

        if (user?.doctorId) {
            throw new AppError('You are not a doctor.', 401);
        }

        const objective = await this.objectivesRepository.findById(objectiveId);
        if (!objective) {
            throw new AppError('That objective does not exist.');
        }

        await this.objectivesRepository.delete(objectiveId);
    }
}
