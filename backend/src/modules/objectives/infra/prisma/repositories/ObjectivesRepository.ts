import { Objective } from '@prisma/client';

import ICreateObjectiveDTO from '@modules/objectives/dtos/ICreateObjectiveDTO';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';
import { prisma } from '@shared/infra/http/server';

export default class ObjectivesRepository implements IObjectivesRepository {
  public async create(data: ICreateObjectiveDTO): Promise<Objective> {
    const objective = await prisma.objective.create({ data });

    return objective;
  }

  public async findAll(): Promise<Objective[]> {
    const objectives = await prisma.objective.findMany();

    return objectives;
  }

  public async findById(id: string): Promise<Objective | null> {
    const objective = await prisma.objective.findUnique({
      where: { id },
    });

    return objective;
  }

  public async update(id: string, data: Partial<Objective>): Promise<Objective> {
    const updatedObjective = prisma.objective.update({
      where: { id },
      data,
    });

    return updatedObjective;
  }
}
