import { Message } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IMessagesRepository from '../repositories/IMessagesRepository';

@injectable()
export default class ListMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  public async execute(userId: string): Promise<Message[]> {
    const messages = await this.messagesRepository.findMessages(userId);

    return messages;
  }
}
