import Objective from '@entities/Objective';
import Progress from '@entities/Progress';
import User, { ICreateUserDTO } from '@entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await User.create(data);

    return user;
  }

  public async findAllPatients(): Promise<User[]> {
    let users = await User.findAll();

    users = users.filter(user => user.doctorId != null);

    return users;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      include: [
        { model: User, as: 'patients' },
        { model: Progress, attributes: ['progress'], include: [Objective] },
      ],
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await User.findByPk(id);

    return user;
  }

  public async findByPhone(phoneNumber: string): Promise<User | null> {
    const user = await User.findOne({ where: { phoneNumber } });

    return user;
  }

  public async update(user: User, updatedInfo: Partial<User>): Promise<User> {
    const updatedUser = await user.update(updatedInfo);

    return updatedUser;
  }
}
