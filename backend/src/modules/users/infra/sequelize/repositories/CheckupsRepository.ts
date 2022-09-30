import Checkup, { ICreateCheckupDTO } from '@entities/Checkup';
import CheckupAnswer, { ICreateCheckupAnswerDTO } from '@entities/CheckupAnswer';
import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';
import ICheckupsRepository from '@modules/users/repositories/ICheckupsRepository';

export default class CheckupsRepository implements ICheckupsRepository {
  public async create(data: ICreateCheckupDTO): Promise<Checkup> {
    const checkup = await Checkup.create(data);

    return checkup;
  }

  public async registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer> {
    const answer = await CheckupAnswer.create(data);

    return answer;
  }

  public async registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto> {
    const photo = await DentalPhoto.create(data);

    return photo;
  }
}
