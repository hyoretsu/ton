import { Content, ContentMessage, Prisma } from '@prisma/client';

import ICreateContentDTO from '../dtos/ICreateContentDTO';
import ICreateContentMessageDTO from '../dtos/ICreateContentMessageDTO';

export type CompleteContentMessage = Prisma.ContentMessageGetPayload<{
    include: {
        answers: {
            include: {
                sequel: true;
            };
        };
        sequel: true;
    };
}>;

export default interface IContentsRepository {
    create(data: ICreateContentDTO): Promise<Content>;
    findAll(): Promise<Content[]>;
    findByTitle(title: string): Promise<Content | null>;
    findMessageById(id: string): Promise<CompleteContentMessage | null>;
    filter(treatmentProgress: number): Promise<Content[]>;
    registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage>;
}
