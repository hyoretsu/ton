import { Hematology } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListHematologyService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(userId: string): Promise<Hematology[]> {
        const hematology = await this.usersRepository.findHematology(userId);

        return hematology;
    }
}
