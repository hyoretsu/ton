import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListPatientsService from '@modules/users/services/ListPatientsService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute(body);

        return res.json(user);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { userId } = req.body;

        const deleteUser = container.resolve(DeleteUserService);

        await deleteUser.execute(userId);

        return res.json();
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const listPatientsService = container.resolve(ListPatientsService);

        const users = await listPatientsService.execute();

        return res.json(users);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const updateUser = container.resolve(UpdateUserService);

        const user = await updateUser.execute({ ...body, userId: req.user.id });

        return res.json(user);
    }
}
