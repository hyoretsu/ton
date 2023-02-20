/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { Content, ContentMessage } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import ICreateContentDTO from '../dtos/ICreateContentDTO';
import IContentsRepository from '../repositories/IContentsRepository';

interface IRequest extends Omit<ICreateContentDTO, 'firstMessage'> {
    answers: Array<string | string[]>;
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
        let lastMessage: ContentMessage[] = [firstMessage];

        for (let i = 0; i < remainingMessages.length; i++) {
            const body = remainingMessages[i];

            const messageIsAnswer = body === '%answer%';

            if (messageIsAnswer) {
                if (Array.isArray(answers[answerCount])) {
                    const questionId = lastMessage[0].id;
                    const promises: Promise<ContentMessage>[] = [];

                    // eslint-disable-next-line no-loop-func
                    (answers[answerCount] as string[]).forEach(answer => {
                        promises.push(
                            this.contentsRepository.registerMessage({
                                body: answer,
                                questionId,
                            }),
                        );
                    });
                    answerCount += 1;

                    lastMessage = await Promise.all(promises);

                    continue;
                }

                const message = await this.contentsRepository.registerMessage({
                    body: answers[answerCount++] as string,
                    questionId: lastMessage[0].id,
                });

                lastMessage = [message];

                continue;
            }

            const message = await this.contentsRepository.registerMessage({
                body,
            });

            lastMessage.forEach(currentMessage => {
                this.contentsRepository.updateMessage(currentMessage.id, { sequelId: message.id });
            });

            lastMessage = [message];
        }

        return content;
    }
}
