import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    const existingUser = await this.usersRepository.findById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await this.usersRepository.delete(userId);
  }
}
