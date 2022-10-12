import IFindProgressDTO from '@modules/objectives/dtos/IFindProgressDTO';
import IProgressRepository from '@modules/objectives/repositories/IProgressRepository';
import Progress, { ICreateProgressDTO } from '@shared/infra/sequelize/entities/Progress';

export default class ProgressRepository implements IProgressRepository {
  public async create(data: ICreateProgressDTO): Promise<Progress> {
    const progress = await Progress.create(data);

    return progress;
  }

  public async findAll(userId: string): Promise<Progress[]> {
    const progresses = await Progress.findAll({ where: { userId } });

    return progresses;
  }

  public async findExisting({ objectiveId, userId }: IFindProgressDTO): Promise<Progress[]> {
    const progress = await Progress.findAll({ where: { objectiveId, userId } });

    return progress;
  }

  public async update(oldProgress: Progress, newProgress: number): Promise<Progress> {
    const updatedProgress = await oldProgress.update({ progress: newProgress });

    return updatedProgress;
  }
}
