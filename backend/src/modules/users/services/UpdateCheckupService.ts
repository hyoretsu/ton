import { inject, injectable } from 'tsyringe';

import ICheckupsRepository from '../repositories/ICheckupsRepository';

interface IRequest {
  answers: Record<string, string>;
  checkupId: string;
}

@injectable()
export default class UpdateCheckupService {
  constructor(
    @inject('CheckupsRepository')
    private checkupsRepository: ICheckupsRepository,
  ) {}

  public async execute({ answers, checkupId }: IRequest): Promise<void> {
    const existingCheckup = await this.checkupsRepository.findById(checkupId);
    if (!existingCheckup) {
      throw new Error('Este exame não existe.');
    }

    Object.entries(answers).forEach(([question, answer]) => {
      const matchingAnswer = existingCheckup.answers.find(foundAnswer => foundAnswer.question === question);
      if (!matchingAnswer) {
        return this.checkupsRepository.registerAnswer({ checkupId, question, answer });
      }

      return this.checkupsRepository.updateAnswer(matchingAnswer.id, answer);
    });
  }
}
