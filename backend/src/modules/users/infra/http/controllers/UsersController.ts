import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListPatientsService from '@modules/users/services/ListPatientsService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(body);

    return res.json(user);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listPatientsService = container.resolve(ListPatientsService);

    const users = await listPatientsService.execute();

    return res.json(users);
  }
}
