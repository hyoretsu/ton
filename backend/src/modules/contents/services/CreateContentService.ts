import { inject, injectable } from 'tsyringe';

import Content, { ICreateContentDTO } from '@entities/Content';

import IContentsRepository from '../repositories/IContentsRepository';

interface IRequest extends ICreateContentDTO {
  messages: string[];
}

@injectable()
export default class CreateContentService {
  constructor(
    @inject('ContentsRepository')
    private contentsRepository: IContentsRepository,
  ) {}

  public async execute({ messages, ...contentInfo }: IRequest): Promise<Content> {
    const content = await this.contentsRepository.create(contentInfo);

    messages.forEach(async body => {
      await this.contentsRepository.registerMessage({
        contentId: content.id,
        body,
      });
    });

    return content;
  }
}
