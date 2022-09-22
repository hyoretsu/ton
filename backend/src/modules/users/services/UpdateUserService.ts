import { inject, injectable } from 'tsyringe';

import User from '@entities/User';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  city?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  userId: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ userId, password, ...data }: IRequest): Promise<User> {
    const existingUser = await this.usersRepository.findById(userId);
    if (!existingUser) {
      throw new AppError('Este usuário não existe.');
    }

    if (password) password = await this.hashProvider.generateHash(password);

    const updatedUser = await this.usersRepository.update(existingUser, { ...data, password });

    return updatedUser;
  }
}
