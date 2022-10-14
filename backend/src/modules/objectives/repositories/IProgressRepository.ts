import { Progress } from '@prisma/client';

import ICreateProgressDTO from '../dtos/ICreateProgressDTO';
import IFindProgressDTO from '../dtos/IFindProgressDTO';

export default interface IProgressRepository {
  create(data: ICreateProgressDTO): Promise<Progress>;
  findAll(userId: string): Promise<Progress[]>;
  findExisting(data: IFindProgressDTO): Promise<Progress[]>;
  update(progressId: string, newProgress: number): Promise<Progress>;
}
