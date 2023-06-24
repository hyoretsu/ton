import { HashProvider, MailProvider } from '@hyoretsu/providers';
import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ForgotPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: HashProvider,

        @inject('MailProvider')
        private mailProvider: MailProvider,
    ) {}

    public async execute(email: string): Promise<void> {
        const foundUser = await this.usersRepository.findByEmail(email);
        if (!foundUser) {
            throw new AppError('There is no user with the given email');
        }

        const newPassword = crypto.randomBytes(3).toString('hex');
        const hashedPassword = await this.hashProvider.generateHash(newPassword);

        await this.usersRepository.update(foundUser.id, {
            password: hashedPassword,
        });

        await this.mailProvider.sendMail({
            to: email,
            subject: 'TON - Senha Temporária',
            body: `Olá! Sua nova senha é:\n${newPassword}\n\nPor favor, ao entrar, redefina sua senha na tela de Dados Pessoais.`,
        });
    }
}
