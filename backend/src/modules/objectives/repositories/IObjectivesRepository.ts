import { Objective } from '@prisma/client';

import ICreateObjectiveDTO from '../dtos/ICreateObjectiveDTO';

export default interface IObjectivesRepository {
    create(data: ICreateObjectiveDTO): Promise<Objective>;
    findAll(): Promise<Objective[]>;
    findById(id: string): Promise<Objective | null>;
    update(objectiveId: string, updatedInfo: Partial<Objective>): Promise<Objective>;
}
