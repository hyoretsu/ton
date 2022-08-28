import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';
import User, { ICreateUserDTO } from '@entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByPhone(phoneNumber: string): Promise<User | null>;
  registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto>;
}
