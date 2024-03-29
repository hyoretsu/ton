import { Checkup, CheckupAnswer, DentalPhoto, Prisma } from '@prisma/client';

import ICreateCheckupAnswerDTO from '../dtos/ICreateCheckupAnswerDTO';
import ICreateCheckupDTO from '../dtos/ICreateCheckupDTO';
import IFindPhotoDTO from '../dtos/IFindPhotoDTO';
import IRegisterPhotoDTO from '../dtos/IRegisterPhotoDTO';

export type CompleteCheckup = Prisma.CheckupGetPayload<{
    include: {
        answers: true;
        photos: true;
    };
}>;

export default interface ICheckupsRepository {
    create(data: ICreateCheckupDTO): Promise<Checkup>;
    delete(checkupId: string): Promise<void>;
    findById(checkupId: string): Promise<CompleteCheckup | null>;
    findCheckup(createdAt: Date): Promise<Checkup | null>;
    findCheckups(patientId: string): Promise<Array<CompleteCheckup | null>>;
    findLatestCheckup(patientId: string): Promise<Checkup | null>;
    findPhoto(data: IFindPhotoDTO): Promise<DentalPhoto | null>;
    registerAnswer(data: ICreateCheckupAnswerDTO): Promise<CheckupAnswer>;
    registerPhoto(data: IRegisterPhotoDTO): Promise<DentalPhoto>;
    updateAnswer(answerId: string, newAnswer: string): Promise<CheckupAnswer>;
}
