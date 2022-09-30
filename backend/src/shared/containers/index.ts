import { container } from 'tsyringe';

import '@modules/users/providers';

import ContentsRepository from '@modules/contents/infra/sequelize/repositories/ContentsRepository';
import IContentsRepository from '@modules/contents/repositories/IContentsRepository';
import MessagesRepository from '@modules/messages/infra/sequelize/repositories/MessagesRepository';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import ObjectivesRepository from '@modules/objectives/infra/sequelize/repositories/ObjectivesRepository';
import ProgressRepository from '@modules/objectives/infra/sequelize/repositories/ProgressRepository';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';
import IProgressRepository from '@modules/objectives/repositories/IProgressRepository';
import CheckupsRepository from '@modules/users/infra/sequelize/repositories/CheckupsRepository';
import UsersRepository from '@modules/users/infra/sequelize/repositories/UsersRepository';
import ICheckupsRepository from '@modules/users/repositories/ICheckupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<ICheckupsRepository>('CheckupsRepository', CheckupsRepository);
container.registerSingleton<IContentsRepository>('ContentsRepository', ContentsRepository);
container.registerSingleton<IMessagesRepository>('MessagesRepository', MessagesRepository);
container.registerSingleton<IObjectivesRepository>('ObjectivesRepository', ObjectivesRepository);
container.registerSingleton<IProgressRepository>('ProgressRepository', ProgressRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
