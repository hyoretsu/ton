import Objective, { ICreateObjectiveDTO } from '@entities/Objective';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';

export default class ObjectivesRepository implements IObjectivesRepository {
  public async create(data: ICreateObjectiveDTO): Promise<Objective> {
    const objective = await Objective.create(data);

    return objective;
  }

  public async findById(id: string): Promise<Objective | null> {
    const objective = await Objective.findByPk(id);

    return objective;
  }
}
