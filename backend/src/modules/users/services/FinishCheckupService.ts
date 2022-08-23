import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  photos: Express.Multer.File[];
  userId: string;
}

@injectable()
export default class FinishCheckupService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ photos, userId }: IRequest): Promise<void> {
    photos.forEach(async photo => {
      await this.usersRepository.registerPhoto({
        category: photo.fieldname,
        fileName: photo.filename,
        patientId: userId,
      });
    });
  }
}
