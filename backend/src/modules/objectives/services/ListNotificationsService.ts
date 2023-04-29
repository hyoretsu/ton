import { ObjectiveNotification } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IFindNotificationsDTO from '../dtos/IFindNotificationsDTO';
import IObjectivesRepository from '../repositories/IObjectivesRepository';

@injectable()
export default class ListObjectiveNotificationsService {
    constructor(
        @inject('ObjectivesRepository')
        private objectivesRepository: IObjectivesRepository,
    ) {}

    public async execute(data: IFindNotificationsDTO): Promise<ObjectiveNotification[]> {
        const notifications = await this.objectivesRepository.findNotifications(data);

        return notifications;
    }
}
