import Checkup, { ICreateCheckupDTO } from '@entities/Checkup';
import CheckupAnswer, { ICreateCheckupAnswerDTO } from '@entities/CheckupAnswer';
import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';

import IFindPhotoDTO from '../dtos/IFindPhotoDTO';

export default interface ICheckupsRepository {
  create(data: ICreateCheckupDTO): Promise<Checkup>;
  findById(checkupId: string): Promise<Checkup | null>;
  findCheckups(patientId: string): Promise<Checkup[]>;
  findPhoto(data: IFindPhotoDTO): Promise<DentalPhoto | null>;
  registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer>;
  registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto>;
  updateAnswer(existingAnswer: CheckupAnswer, answer: string): Promise<CheckupAnswer>;
}
