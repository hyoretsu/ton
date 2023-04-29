import { Objective, ObjectiveNotification } from '@prisma/client';

import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import ICreateObjectiveDTO from '../dtos/ICreateObjectiveDTO';
import IFindNotificationsDTO from '../dtos/IFindNotificationsDTO';

export default interface IObjectivesRepository {
    create(data: ICreateObjectiveDTO): Promise<Objective>;
    delete(id: string): Promise<void>;
    deleteNotification(id: string): Promise<void>;
    findAll(): Promise<Objective[]>;
    findById(id: string): Promise<Objective | null>;
    findNotificationById(id: string): Promise<ObjectiveNotification | null>;
    findNotifications(data: IFindNotificationsDTO): Promise<ObjectiveNotification[]>;
    registerNotification(data: ICreateNotificationDTO): Promise<ObjectiveNotification>;
    update(objectiveId: string, updatedInfo: Partial<Objective>): Promise<Objective>;
}
