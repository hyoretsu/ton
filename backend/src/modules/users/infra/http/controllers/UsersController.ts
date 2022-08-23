import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(body);

    return res.json(user);
  }
}
