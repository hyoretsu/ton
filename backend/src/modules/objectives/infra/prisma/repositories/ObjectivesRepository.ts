import { Objective, ObjectiveNotification } from '@prisma/client';

import ICreateNotificationDTO from '@modules/objectives/dtos/ICreateNotificationDTO';
import ICreateObjectiveDTO from '@modules/objectives/dtos/ICreateObjectiveDTO';
import IFindNotificationsDTO from '@modules/objectives/dtos/IFindNotificationsDTO';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';
import { prisma } from '@shared/infra/http/server';

export default class ObjectivesRepository implements IObjectivesRepository {
    public async create({ notifications, ...data }: ICreateObjectiveDTO): Promise<Objective> {
        const objective = await prisma.objective.create({
            data: {
                ...data,
                ...(notifications && {
                    notifications: {
                        createMany: {
                            data: notifications.map(notification => ({ time: notification })),
                        },
                    },
                }),
            },
        });

        return objective;
    }

    public async delete(id: string): Promise<void> {
        await prisma.objective.delete({ where: { id } });
    }

    public async deleteNotification(id: string): Promise<void> {
        await prisma.objectiveNotification.delete({ where: { id } });
    }

    public async findAll(): Promise<Objective[]> {
        const objectives = await prisma.objective.findMany();

        return objectives;
    }

    public async findById(id: string): Promise<Objective | null> {
        const objective = await prisma.objective.findUnique({
            where: { id },
        });

        return objective;
    }

    public async findNotificationById(id: string): Promise<ObjectiveNotification | null> {
        const notification = await prisma.objectiveNotification.findUnique({
            where: { id },
        });

        return notification;
    }

    public async findNotifications({
        objectiveId,
        patientId,
    }: IFindNotificationsDTO): Promise<ObjectiveNotification[]> {
        const notifications = await prisma.objectiveNotification.findMany({
            where: {
                AND: [
                    ...(objectiveId ? [{ objectiveId }] : [{}]),
                    {
                        OR: [{ patientId }, { patientId: null }],
                    },
                ],
            },
            include: { objective: true },
        });

        const userNotifications = notifications.filter(notification => notification.patientId === patientId);

        return patientId ? userNotifications : notifications;
    }

    public async registerNotification(data: ICreateNotificationDTO): Promise<ObjectiveNotification> {
        const notification = await prisma.objectiveNotification.create({
            data,
        });

        return notification;
    }

    public async update(id: string, data: Partial<Objective>): Promise<Objective> {
        const updatedObjective = prisma.objective.update({
            where: { id },
            data,
        });

        return updatedObjective;
    }
}
