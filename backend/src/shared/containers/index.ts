import {
    HashProvider,
    HashProviderKeys,
    hashProviders,
    MailProvider,
    MailProviderKeys,
    mailProviders,
} from '@hyoretsu/providers';
import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infra/prisma/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ContentsRepository from '@modules/contents/infra/prisma/repositories/ContentsRepository';
import IContentsRepository from '@modules/contents/repositories/IContentsRepository';
import MessagesRepository from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import ObjectivesRepository from '@modules/objectives/infra/prisma/repositories/ObjectivesRepository';
import ProgressRepository from '@modules/objectives/infra/prisma/repositories/ProgressRepository';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';
import IProgressRepository from '@modules/objectives/repositories/IProgressRepository';
import CheckupsRepository from '@modules/users/infra/prisma/repositories/CheckupsRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import ICheckupsRepository from '@modules/users/repositories/ICheckupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<ICheckupsRepository>('CheckupsRepository', CheckupsRepository);
container.registerSingleton<IContentsRepository>('ContentsRepository', ContentsRepository);
container.registerSingleton<IMessagesRepository>('MessagesRepository', MessagesRepository);
container.registerSingleton<IObjectivesRepository>('ObjectivesRepository', ObjectivesRepository);
container.registerSingleton<IProgressRepository>('ProgressRepository', ProgressRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<HashProvider>('HashProvider', hashProviders[process.env.HASH_DRIVER as HashProviderKeys]);
container.registerInstance<MailProvider>(
    'MailProvider',
    new mailProviders[process.env.MAIL_DRIVER as MailProviderKeys](),
);
