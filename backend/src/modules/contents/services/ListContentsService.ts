import { differenceInWeeks } from 'date-fns';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IContentsRepository, { CompleteContent } from '../repositories/IContentsRepository';

@injectable()
export default class ListContentsService {
    constructor(
        @inject('ContentsRepository')
        private contentsRepository: IContentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(auth?: string): Promise<CompleteContent[]> {
        if (auth) {
            let userId: string;
            try {
                const { sub } = verify(auth.split(' ')[1], authConfig.jwt.secret);
                userId = sub as string;
            } catch {
                throw new AppError('Por favor, entre na sua conta novamente.');
            }

            const user = await this.usersRepository.findById(userId as string);
            if (!user) {
                throw new AppError('O usuário autenticado não foi encontrado.');
            }

            const contents = await this.contentsRepository.filter(
                differenceInWeeks(new Date(), user.createdAt),
                user.treatment || '',
            );

            return contents;
        }

        const contents = await this.contentsRepository.findAll();

        return contents;
    }
}
