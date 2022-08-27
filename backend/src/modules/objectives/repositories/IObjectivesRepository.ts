import Objective, { ICreateObjectiveDTO } from '@entities/Objective';

export default interface IObjectivesRepository {
  create(data: ICreateObjectiveDTO): Promise<Objective>;
}
