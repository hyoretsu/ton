import { inject, injectable } from 'tsyringe';

import { PeriodicInfo } from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    patientId: string;
    periodicInfo: PeriodicInfo;
}

@injectable()
export default class UpdatePeriodicInfoControllerService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ patientId, periodicInfo }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(patientId);
        if (!user) {
            throw new Error('User not found');
        }

        await this.usersRepository.updatePeriodicInfo(patientId, periodicInfo);
    }
}
