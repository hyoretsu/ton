/* eslint-disable no-await-in-loop */
import { wait } from '@hyoretsu/utils';
import { Message, User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IContentsRepository from '@modules/contents/repositories/IContentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { io } from '@shared/infra/http/server';

import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import IMessagesRepository from '../repositories/IMessagesRepository';

interface IRequest extends Omit<ICreateMessageDTO, 'recipientId'> {
    recipientId?: string;
    sequelId?: string;
    socketId: string;
}

@injectable()
export default class CreateMessageService {
    constructor(
        @inject('MessagesRepository')
        private messagesRepository: IMessagesRepository,

        @inject('ContentsRepository')
        private contentsRepository: IContentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ body, recipientId, senderId, sequelId }: IRequest): Promise<Message> {
        if (body === '') {
            throw new AppError('Please, send a message body.');
        }

        const sender = await this.usersRepository.findById(senderId);
        if (!sender) {
            throw new AppError("The given sender doesn't exist.");
        }

        if (recipientId) {
            const recipient = await this.usersRepository.findById(recipientId);
            if (!recipient) {
                throw new AppError("The given recipient doesn't exist.");
            }
        }

        let bot: User | null = null;
        if (!recipientId) {
            bot = await this.usersRepository.findByEmail(process.env.MAIL_DEFAULT_ADDRESS as string);
        }

        const message = await this.messagesRepository.create({
            body,
            recipientId: bot?.id || (recipientId as string),
            senderId,
        });

        const foundContent = await this.contentsRepository.findByTitle(body);

        if (foundContent || sequelId) {
            let nextMessage = await this.contentsRepository.findMessageById(
                sequelId || (foundContent?.firstMessageId as string),
            );

            while (true) {
                io.emit(`chat:${senderId}`);

                await wait(2000);

                await this.messagesRepository.create({
                    body: nextMessage?.body as string,
                    recipientId: senderId,
                    senderId: bot?.id as string,
                });

                if (!nextMessage?.sequelId) {
                    if (nextMessage?.answers) {
                        io.emit(`answer:${senderId}`, nextMessage.answers);
                    }

                    break;
                }

                nextMessage = await this.contentsRepository.findMessageById(nextMessage.sequelId);
            }
        }

        io.emit(`chat:${senderId}`);
        io.emit(`chat:${recipientId}`, senderId);

        return message;
    }
}
