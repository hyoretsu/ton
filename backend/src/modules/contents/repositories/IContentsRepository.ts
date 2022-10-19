import { Content, ContentMessage, Prisma } from '@prisma/client';

import ICreateContentDTO from '../dtos/ICreateContentDTO';
import ICreateContentMessageDTO from '../dtos/ICreateContentMessageDTO';

export default interface IContentsRepository {
    create(data: ICreateContentDTO): Promise<Content>;
    findAll(): Promise<Content[]>;
    findByTitle(title: string): Promise<Prisma.ContentGetPayload<{ include: { messages: true } }> | null>;
    filter(treatmentProgress: number): Promise<Content[]>;
    registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage>;
}
