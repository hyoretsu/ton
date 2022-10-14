import { Message } from '@prisma/client';

import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

export default interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
  findMessages(userId: string): Promise<Message[]>;
}
