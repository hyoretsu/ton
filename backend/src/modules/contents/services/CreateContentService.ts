import { Content, ContentMessage } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import ICreateContentDTO from '../dtos/ICreateContentDTO';
import IContentsRepository from '../repositories/IContentsRepository';

interface IRequest extends Omit<ICreateContentDTO, 'firstMessage'> {
    answers: string[];
    messages: string[];
}

@injectable()
export default class CreateContentService {
    constructor(
        @inject('ContentsRepository')
        private contentsRepository: IContentsRepository,
    ) {}

    public async execute({ answers, messages, ...contentInfo }: IRequest): Promise<Content> {
        const firstMessage = await this.contentsRepository.registerMessage({
            body: messages[0],
        });
        const content = await this.contentsRepository.create({
            ...contentInfo,
            firstMessageId: firstMessage.id,
        });

        const remainingMessages = messages.slice(1);
        let answerCount = 0;
        let lastMessage: ContentMessage = firstMessage;

        for (let i = 0; i < remainingMessages.length; i++) {
            const body = remainingMessages[i];

            const messageIsAnswer = body === '%answer%';

            // eslint-disable-next-line no-await-in-loop
            lastMessage = await this.contentsRepository.registerMessage({
                // eslint-disable-next-line no-plusplus
                body: messageIsAnswer ? answers[answerCount++] : body,
                [messageIsAnswer ? 'questionId' : 'prequelId']: lastMessage.id,
            });
        }

        return content;
    }
}
