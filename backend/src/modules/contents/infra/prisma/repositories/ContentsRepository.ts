import { Content, ContentMessage, Prisma } from '@prisma/client';

import ICreateContentDTO from '@modules/contents/dtos/ICreateContentDTO';
import ICreateContentMessageDTO from '@modules/contents/dtos/ICreateContentMessageDTO';
import IContentsRepository from '@modules/contents/repositories/IContentsRepository';
import { prisma } from '@shared/infra/http/server';

export default class ContentsRepository implements IContentsRepository {
    public async create(data: ICreateContentDTO): Promise<Content> {
        const content = await prisma.content.create({ data });

        return content;
    }

    public async filter(treatmentProgress: number): Promise<Content[]> {
        const contents = await prisma.content.findMany({
            where: {
                condition: {
                    lte: treatmentProgress,
                },
            },
        });

        return contents;
    }

    public async findAll(): Promise<Content[]> {
        const contents = await prisma.content.findMany();

        return contents;
    }

    public async findByTitle(title: string): Promise<Prisma.ContentGetPayload<{ include: { messages: true } }> | null> {
        const content = await prisma.content.findFirst({
            where: { title },
            include: {
                messages: true,
            },
        });

        return content;
    }

    public async registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage> {
        const content = await prisma.contentMessage.create({ data });

        return content;
    }
}
