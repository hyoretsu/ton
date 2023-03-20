import { MedicineRelation } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListMedicineService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(userId: string): Promise<MedicineRelation[]> {
        const medicine = await this.usersRepository.findMedicine(userId);

        return medicine;
    }
}
