import { inject, injectable } from 'tsyringe';

import Message, { ICreateMessageDTO } from '@entities/Message';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { io } from '@shared/infra/http/server';

import IMessagesRepository from '../repositories/IMessagesRepository';

interface IRequest extends ICreateMessageDTO {
  socketId: string;
}

@injectable()
export default class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ body, recipientId, senderId, socketId }: IRequest): Promise<Message> {
    const sender = await this.usersRepository.findById(senderId);
    if (!sender) {
      throw new AppError("The given sender doesn't exist.");
    }

    const recipient = await this.usersRepository.findById(recipientId);
    if (!recipient) {
      throw new AppError("The given recipient doesn't exist.");
    }

    const message = await this.messagesRepository.create({ body, recipientId, senderId });

    io.emit('chat');

    return message;
  }
}
