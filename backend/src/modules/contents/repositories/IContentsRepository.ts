import Content, { ICreateContentDTO } from '@entities/Content';
import ContentMessage, { ICreateContentMessageDTO } from '@entities/ContentMessage';

export default interface IContentsRepository {
  create(data: ICreateContentDTO): Promise<Content>;
  findAll(): Promise<Content[]>;
  filter(treatmentProgress: number): Promise<Content[]>;
  registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage>;
}
