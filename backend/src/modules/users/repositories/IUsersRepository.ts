import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    delete(userId: string): Promise<void>;
    findAllPatients(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByPhone(phoneNumber: string): Promise<User | null>;
    update(userId: string, updatedInfo: Partial<User>): Promise<User>;
}
