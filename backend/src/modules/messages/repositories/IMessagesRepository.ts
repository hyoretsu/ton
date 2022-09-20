import Message, { ICreateMessageDTO } from '@entities/Message';

export default interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
  findMessages(userId: string): Promise<Message[]>;
}
