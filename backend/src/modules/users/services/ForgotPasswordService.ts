import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ForgotPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
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
            to: {
                email,
                name: foundUser.parentName || foundUser.name,
            },
            subject: 'TON - Senha Temporária',
            body: `Olá! Sua nova senha é:\n${newPassword}`,
        });
    }
}
