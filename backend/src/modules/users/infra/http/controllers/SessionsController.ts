import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const createSession = container.resolve(CreateSessionService);

    const session = await createSession.execute(body);

    return res.json(session);
  }
}
