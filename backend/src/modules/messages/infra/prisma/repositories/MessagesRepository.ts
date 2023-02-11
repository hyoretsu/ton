import { Message } from '@prisma/client';

import ICreateMessageDTO from '@modules/messages/dtos/ICreateMessageDTO';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import { prisma } from '@shared/infra/http/server';

export default class MessagesRepository implements IMessagesRepository {
    public async create(data: ICreateMessageDTO): Promise<Message> {
        const message = await prisma.message.create({ data });

        return message;
    }

    public async findMessages(userId: string): Promise<Message[]> {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        recipientId: userId,
                    },
                    {
                        senderId: userId,
                    },
                ],
            },
            include: {
                sender: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return messages;
    }
}
