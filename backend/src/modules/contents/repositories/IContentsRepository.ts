import { Content, ContentMessage, Prisma } from '@prisma/client';

import ICreateContentDTO from '../dtos/ICreateContentDTO';
import ICreateContentMessageDTO from '../dtos/ICreateContentMessageDTO';

export type CompleteContent = Prisma.ContentGetPayload<{
    include: {
        firstMessage: true;
    };
}>;

export type CompleteContentMessage = Prisma.ContentMessageGetPayload<{
    include: {
        answers: true;
    };
}>;

export default interface IContentsRepository {
    create(data: ICreateContentDTO): Promise<Content>;
    findAll(): Promise<CompleteContent[]>;
    findByTitle(title: string): Promise<Content | null>;
    findMessageById(id: string): Promise<CompleteContentMessage | null>;
    filter(treatmentProgress: number, treatment?: string): Promise<CompleteContent[]>;
    registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage>;
    updateMessage(id: string, data: Partial<ContentMessage>): Promise<ContentMessage>;
}
