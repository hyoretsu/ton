import Checkup, { ICreateCheckupDTO } from '@entities/Checkup';
import CheckupAnswer, { ICreateCheckupAnswerDTO } from '@entities/CheckupAnswer';

export default interface ICheckupsRepository {
  create(data: ICreateCheckupDTO): Promise<Checkup>;
  registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer>;
  registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto>;
}
