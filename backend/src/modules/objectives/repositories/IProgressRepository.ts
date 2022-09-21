import Progress, { ICreateProgressDTO } from '@entities/Progress';

import IFindProgressDTO from '../dtos/IFindProgressDTO';

export default interface IProgressRepository {
  create(data: ICreateProgressDTO): Promise<Progress>;
  findAll(userId: string): Promise<Progress[]>;
  findExisting(data: IFindProgressDTO): Promise<Progress | null>;
  update(oldProgress: Progress, newProgress: number): Promise<Progress>;
}
