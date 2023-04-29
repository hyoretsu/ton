import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IDeleteNotificationDTO from '../dtos/IDeleteNotificationDTO';
import IObjectivesRepository from '../repositories/IObjectivesRepository';

@injectable()
export default class DeleteNotificationService {
    constructor(
        @inject('ObjectivesRepository')
        private objectivesRepository: IObjectivesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ notificationId, userId }: IDeleteNotificationDTO): Promise<void> {
        const notification = await this.objectivesRepository.findNotificationById(notificationId);
        if (!notification) {
            throw new AppError('That notification does not exist.');
        }

        if (notification.patientId && userId) {
            const user = await this.usersRepository.findById(notification.patientId);
            if (!user) {
                throw new AppError('The patient associated with this notification does not exist.');
            }

            if (userId !== notification.patientId && userId !== user.doctorId) {
                throw new AppError("You cannot delete notifications from other doctors' patient.", 403);
            }
        } else {
            const user = await this.usersRepository.findById(userId);
            if (user?.doctorId) {
                throw new AppError('You are not a doctor.', 401);
            }
        }

        await this.objectivesRepository.deleteNotification(notificationId);
    }
}
