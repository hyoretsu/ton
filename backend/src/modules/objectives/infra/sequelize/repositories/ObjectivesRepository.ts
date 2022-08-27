import Objective, { ICreateObjectiveDTO } from '@entities/Objective';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';

export default class ObjectivesRepository implements IObjectivesRepository {
  public async create(data: ICreateObjectiveDTO): Promise<Objective> {
    const objective = await Objective.create(data);

    return objective;
  }
}
