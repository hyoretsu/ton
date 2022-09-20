import { Op } from 'sequelize';

import Message, { ICreateMessageDTO } from '@entities/Message';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

export default class MessagesRepository implements IMessagesRepository {
  public async create(data: ICreateMessageDTO): Promise<Message> {
    const message = await Message.create(data);

    return message;
  }

  public async findMessages(userId: string): Promise<Message[]> {
    const messages = await Message.findAll({
      where: {
        [Op.or]: {
          recipientId: userId,
          senderId: userId,
        },
      },
    });

    return messages;
  }
}
