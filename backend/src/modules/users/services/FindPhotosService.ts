import { inject, injectable } from 'tsyringe';

import DentalPhoto from '@entities/DentalPhoto';

import ICheckupsRepository from '../repositories/ICheckupsRepository';

interface IRequest {
  category: string;
  patientId: string;
}

@injectable()
export default class FindPhotosService {
  constructor(
    @inject('CheckupsRepository')
    private checkupsRepository: ICheckupsRepository,
  ) {}

  public async execute({ category, patientId }: IRequest): Promise<DentalPhoto> {
    const checkups = await this.checkupsRepository.findCheckups(patientId);

    const photo = await this.checkupsRepository.findPhoto({
      category,
      checkupId: checkups[0].id,
    });

    return photo;
  }
}
