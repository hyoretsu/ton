import Content, { ICreateContentDTO } from '@entities/Content';
import ContentMessage, { ICreateContentMessageDTO } from '@entities/ContentMessage';
import IContentsRepository from '@modules/contents/repositories/IContentsRepository';

export default class ContentsRepository implements IContentsRepository {
  public async create(data: ICreateContentDTO): Promise<Content> {
    const content = await Content.create(data);

    return content;
  }

  public async registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage> {
    const content = await ContentMessage.create(data);

    return content;
  }
}
