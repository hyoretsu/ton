import { ObjectiveNotification } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IObjectivesRepository from '../repositories/IObjectivesRepository';

interface IParams {
    objectiveId: string;
    patientId?: string;
    times: Date[];
}

@injectable()
export default class CreateNotificationService {
    constructor(
        @inject('ObjectivesRepository')
        private objectivesRepository: IObjectivesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ objectiveId, patientId, times }: IParams): Promise<ObjectiveNotification[]> {
        if (patientId) {
            const user = await this.usersRepository.findById(patientId);

            if (!user) {
                throw new AppError('This user does not exist.');
            }
        }

        const notifications: ObjectiveNotification[] = [];

        for (const time of times) {
            // eslint-disable-next-line no-await-in-loop
            const notification = await this.objectivesRepository.registerNotification({
                objectiveId,
                time,
                ...(patientId && { patientId }),
            });

            notifications.push(notification);
        }

        return notifications;
    }
}
