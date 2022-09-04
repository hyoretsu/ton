import { Op } from 'sequelize';

import Content, { ICreateContentDTO } from '@entities/Content';
import ContentMessage, { ICreateContentMessageDTO } from '@entities/ContentMessage';
import IContentsRepository from '@modules/contents/repositories/IContentsRepository';

export default class ContentsRepository implements IContentsRepository {
  public async create(data: ICreateContentDTO): Promise<Content> {
    const content = await Content.create(data);

    return content;
  }

  public async filter(treatmentProgress: number): Promise<Content[]> {
    const contents = await Content.findAll({
      where: {
        condition: {
          [Op.lte]: treatmentProgress,
        },
      },
      include: [ContentMessage],
    });

    return contents;
  }

  public async findAll(): Promise<Content[]> {
    const contents = await Content.findAll({ include: [ContentMessage] });

    return contents;
  }

  public async registerMessage(data: ICreateContentMessageDTO): Promise<ContentMessage> {
    const content = await ContentMessage.create(data);

    return content;
  }
}
