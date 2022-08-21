import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  public async registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto> {
    const photo = await DentalPhoto.create(data);

    return photo;
  }
}
