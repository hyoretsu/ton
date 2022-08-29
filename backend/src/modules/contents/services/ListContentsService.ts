import { inject, injectable } from 'tsyringe';

import Content from '@entities/Content';

import IContentsRepository from '../repositories/IContentsRepository';

@injectable()
export default class ListContentsService {
  constructor(
    @inject('ContentsRepository')
    private contentsRepository: IContentsRepository,
  ) {}

  public async execute(): Promise<Content[]> {
    const contents = this.contentsRepository.findAll();

    return contents;
  }
}
