import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';
import User, { ICreateUserDTO } from '@entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await User.create(data);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  public async findByPhone(phoneNumber: string): Promise<User | null> {
    const user = await User.findOne({ where: { phoneNumber } });

    return user;
  }

  public async registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto> {
    const photo = await DentalPhoto.create(data);

    return photo;
  }
}
