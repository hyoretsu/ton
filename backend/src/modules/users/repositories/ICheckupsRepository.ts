import Checkup, { ICreateCheckupDTO } from '@entities/Checkup';
import CheckupAnswer, { ICreateCheckupAnswerDTO } from '@entities/CheckupAnswer';
import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';

import IFindPhotoDTO from '../dtos/IFindPhotoDTO';

export default interface ICheckupsRepository {
  create(data: ICreateCheckupDTO): Promise<Checkup>;
  findCheckups(patientId: string): Promise<Checkup[]>;
  findPhoto(data: IFindPhotoDTO): Promise<DentalPhoto>;
  registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer>;
  registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto>;
}
