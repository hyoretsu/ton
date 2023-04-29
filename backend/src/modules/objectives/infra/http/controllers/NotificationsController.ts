import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNotificationService from '@modules/objectives/services/CreateNotificationService';
import DeleteNotificationService from '@modules/objectives/services/DeleteNotificationService';
import ListNotificationsService from '@modules/objectives/services/ListNotificationsService';

export default class NotificationsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { patientId, times } = req.body;

        const createNotification = container.resolve(CreateNotificationService);

        const notifications = await createNotification.execute({
            objectiveId: req.params.id,
            patientId: patientId || (patientId === '' ? patientId : req.user.id),
            times,
        });

        return res.json(notifications);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteNotification = container.resolve(DeleteNotificationService);

        await deleteNotification.execute({
            notificationId: req.params.id,
            userId: req.user.id as string,
        });

        return res.json();
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const listNotifications = container.resolve(ListNotificationsService);

        const notifications = await listNotifications.execute({
            objectiveId: req.params.id || '',
            patientId: (req.query.patientId as string) || req.user?.id || '',
        });

        return res.json(notifications);
    }
}
