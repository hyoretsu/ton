import { Progress } from '@prisma/client';

import ICreateProgressDTO from '@modules/objectives/dtos/ICreateProgressDTO';
import IFindProgressDTO from '@modules/objectives/dtos/IFindProgressDTO';
import IProgressRepository from '@modules/objectives/repositories/IProgressRepository';
import { prisma } from '@shared/infra/http/server';

export default class ProgressRepository implements IProgressRepository {
  public async create(data: ICreateProgressDTO): Promise<Progress> {
    const progress = await prisma.progress.create({ data });

    return progress;
  }

  public async findAll(userId: string): Promise<Progress[]> {
    const progresses = await prisma.progress.findMany({
      where: { userId },
    });

    return progresses;
  }

  public async findExisting({ objectiveId, userId }: IFindProgressDTO): Promise<Progress[]> {
    const progress = await prisma.progress.findMany({
      where: {
        objectiveId,
        userId,
      },
    });

    return progress;
  }

  public async update(id: string, progress: number): Promise<Progress> {
    const updatedProgress = await prisma.progress.update({
      where: { id },
      data: { progress },
    });

    return updatedProgress;
  }
}
