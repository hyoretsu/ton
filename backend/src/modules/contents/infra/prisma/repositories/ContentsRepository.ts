import { Content, ContentMessage } from '@prisma/client';

import ICreateContentDTO from '@modules/contents/dtos/ICreateContentDTO';
import ICreateContentMessageDTO from '@modules/contents/dtos/ICreateContentMessageDTO';
import IContentsRepository, { CompleteContentMessage } from '@modules/contents/repositories/IContentsRepository';
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

    public async findByTitle(title: string): Promise<Content | null> {
        const content = await prisma.content.findFirst({ where: { title } });

        return content;
    }

    public async findMessageById(id: string): Promise<CompleteContentMessage | null> {
        const message = await prisma.contentMessage.findFirst({
            where: { id },
            include: {
                answers: {
                    include: {
                        sequel: true,
                    },
                },
                sequel: true,
            },
        });

        return message;
    }

    public async registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage> {
        const content = await prisma.contentMessage.create({ data });

        return content;
    }
}
