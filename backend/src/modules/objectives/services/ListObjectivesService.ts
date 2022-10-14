import { Objective } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IObjectivesRepository from '../repositories/IObjectivesRepository';

@injectable()
export default class ListObjectivesService {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
  ) {}

  public async execute(): Promise<Objective[]> {
    const objectives = this.objectivesRepository.findAll();

    return objectives;
  }
}
