import { inject, injectable } from 'tsyringe';

import Objective, { ICreateObjectiveDTO } from '@entities/Objective';

import IObjectivesRepository from '../repositories/IObjectivesRepository';

@injectable()
export default class CreateObjectiveService {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
  ) {}

  public async execute(data: ICreateObjectiveDTO): Promise<Objective> {
    const objective = await this.objectivesRepository.create(data);

    return objective;
  }
}
