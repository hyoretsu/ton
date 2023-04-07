import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    doctorId?: string;
    userId: string;
}

@injectable()
export default class ListUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ doctorId, userId }: IRequest): Promise<User | User[]> {
        if (userId) {
            const user = await this.usersRepository.findById(userId);
            if (!user) {
                throw new Error('User with the given ID not found.');
            }

            return user;
        }

        const users = await this.usersRepository.findAllPatients(doctorId);

        return users;
    }
}
