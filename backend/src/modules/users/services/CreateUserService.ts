import { getYear, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import User, { ICreateUserDTO } from '@entities/User';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    birthDate,
    chartNumber,
    email,
    password,
    phoneNumber,
    ...rest
  }: ICreateUserDTO): Promise<User> {
    if (!isBefore(birthDate, new Date())) {
      throw new AppError('Impossível ter nascido hoje ou no futuro.');
    }
    if (getYear(Date.now()) - getYear(birthDate) > 122) {
      throw new AppError('Data inválida.');
    }

    const sameEmail = await this.usersRepository.findByEmail(email);
    if (sameEmail) {
      throw new AppError('Um paciente com este e-mail já foi cadastrado.');
    }

    const samePhone = await this.usersRepository.findByPhone(phoneNumber);
    if (samePhone) {
      throw new AppError('Um paciente com este celular já foi cadastrado.');
    }

    password = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      birthDate,
      chartNumber,
      email,
      password,
      phoneNumber,
      ...rest,
    });

    return user;
  }
}
