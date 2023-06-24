import { HashProvider } from '@hyoretsu/providers';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: HashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email ou senha incorretos.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);
        if (!passwordMatched) {
            throw new AppError('Email ou senha incorretos.', 401);
        }

        const { secret } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
        });

        return {
            user,
            token,
        };
    }
}
