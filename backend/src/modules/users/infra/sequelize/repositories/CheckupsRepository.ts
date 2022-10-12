import Checkup, { ICreateCheckupDTO } from '@entities/Checkup';
import CheckupAnswer, { ICreateCheckupAnswerDTO } from '@entities/CheckupAnswer';
import DentalPhoto, { IRegisterPhotoDTO } from '@entities/DentalPhoto';
import IFindPhotoDTO from '@modules/users/dtos/IFindPhotoDTO';
import ICheckupsRepository from '@modules/users/repositories/ICheckupsRepository';

export default class CheckupsRepository implements ICheckupsRepository {
  public async create(data: ICreateCheckupDTO): Promise<Checkup> {
    const checkup = await Checkup.create(data);

    return checkup;
  }

  public async findById(checkupId: string): Promise<Checkup | null> {
    const checkup = await Checkup.findByPk(checkupId, { include: [{ association: 'answers' }] });

    return checkup;
  }

  public async findCheckups(patientId: string): Promise<Checkup[]> {
    const checkups = await Checkup.findAll({ where: { patientId } });

    return checkups;
  }

  public async findPhoto({ category, checkupId }: IFindPhotoDTO): Promise<DentalPhoto | null> {
    const photo = await DentalPhoto.findOne({ where: { category, checkupId } });

    return photo;
  }

  public async registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer> {
    const answer = await CheckupAnswer.create(data);

    return answer;
  }

  public async registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto> {
    const photo = await DentalPhoto.create(data);

    return photo;
  }

  public async updateAnswer(existingAnswer: CheckupAnswer, answer: string): Promise<CheckupAnswer> {
    const updatedAnswer = await existingAnswer.update({ answer });

    return updatedAnswer;
  }
}
