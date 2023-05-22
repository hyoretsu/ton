import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMessageService from '@modules/messages/services/CreateMessageService';
import ListMessagesService from '@modules/messages/services/ListMessagesService';

export default class MessagesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const createMessage = container.resolve(CreateMessageService);

        const message = await createMessage.execute({ ...body, senderId: req.user.id });

        return res.json(message);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id: userId } = req.user;

        const listMessage = container.resolve(ListMessagesService);

        const messages = await listMessage.execute(userId as string, req.query.patientId as string);

        return res.json(messages);
    }
}
