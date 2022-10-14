import { Checkup, CheckupAnswer, DentalPhoto, Prisma } from '@prisma/client';

import ICreateCheckupAnswerDTO from '@modules/users/dtos/ICreateCheckupAnswerDTO';
import ICreateCheckupDTO from '@modules/users/dtos/ICreateCheckupDTO';
import IFindPhotoDTO from '@modules/users/dtos/IFindPhotoDTO';
import IRegisterPhotoDTO from '@modules/users/dtos/IRegisterPhotoDTO';
import ICheckupsRepository from '@modules/users/repositories/ICheckupsRepository';
import { prisma } from '@shared/infra/http/server';

export default class CheckupsRepository implements ICheckupsRepository {
  public async create(data: ICreateCheckupDTO): Promise<Checkup> {
    const checkup = await prisma.checkup.create({ data });

    return checkup;
  }

  public async findById(id: string): Promise<Prisma.CheckupGetPayload<{ include: { answers: true } }> | null> {
    const checkup = await prisma.checkup.findUnique({
      where: { id },
      include: {
        answers: true,
      },
    });

    return checkup;
  }

  public async findCheckups(patientId: string): Promise<Checkup[]> {
    const checkups = await prisma.checkup.findMany({
      where: { patientId },
    });

    return checkups;
  }

  public async findPhoto({ category, checkupId }: IFindPhotoDTO): Promise<DentalPhoto | null> {
    const photo = await prisma.dentalPhoto.findFirst({
      where: {
        category,
        checkupId,
      },
    });

    return photo;
  }

  public async registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer> {
    const answer = await prisma.checkupAnswer.create({ data });

    return answer;
  }

  public async registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto> {
    const photo = await prisma.dentalPhoto.create({ data });

    return photo;
  }

  public async updateAnswer(id: string, answer: string): Promise<CheckupAnswer> {
    const updatedAnswer = await prisma.checkupAnswer.update({
      where: { id },
      data: { answer },
    });

    return updatedAnswer;
  }
}
