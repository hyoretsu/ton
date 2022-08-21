import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  photos: Express.Multer.File[];
}

@injectable()
export default class FinishCheckupService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ photos }: IRequest): Promise<void> {
    photos.forEach(async photo => {
      await this.usersRepository.registerPhoto({
        category: photo.fieldname,
        fileName: photo.filename,
      });
    });
  }
}
