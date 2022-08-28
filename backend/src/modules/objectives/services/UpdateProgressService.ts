import { inject, injectable } from 'tsyringe';

import Progress, { ICreateProgressDTO } from '@entities/Progress';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IObjectivesRepository from '../repositories/IObjectivesRepository';
import IProgressRepository from '../repositories/IProgressRepository';

@injectable()
export default class UpdateProgressService {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
    @inject('ProgressRepository')
    private progressRepository: IProgressRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ objectiveId, progress, userId }: ICreateProgressDTO): Promise<Progress> {
    const existingObjective = await this.objectivesRepository.findById(objectiveId);
    if (!existingObjective) {
      throw new AppError('O objetivo informado não existe.');
    }

    const existingUser = await this.usersRepository.findById(userId);
    if (!existingUser) {
      throw new AppError('O usuário informado não existe.');
    }

    const existingProgress = await this.progressRepository.findExisting({ objectiveId, userId });
    if (existingProgress) {
      return this.progressRepository.update(existingProgress, progress);
    }

    return this.progressRepository.create({ objectiveId, progress, userId });
  }
}
