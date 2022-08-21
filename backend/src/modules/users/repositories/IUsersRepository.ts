import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';

export default interface IUsersRepository {
  registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto>;
}
