import { User } from '@prisma/client';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { prisma } from '@shared/infra/http/server';

export default class UsersRepository implements IUsersRepository {
    public async create(data: ICreateUserDTO): Promise<User> {
        const user = await prisma.user.create({ data });

        return user;
    }

    public async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });
    }

    public async findAllPatients(): Promise<User[]> {
        let users = await prisma.user.findMany();

        users = users.filter(user => user.doctorId != null);

        return users;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { email },
            include: {
                patients: true,
                progresses: true,
            },
        });

        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        return user;
    }

    public async findByPhone(phoneNumber: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { phoneNumber },
        });

        return user;
    }

    public async update(id: string, data: Partial<User>): Promise<User> {
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
        });

        return updatedUser;
    }
}
