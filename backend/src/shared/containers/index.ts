import { container } from 'tsyringe';

import '@modules/users/providers';

import ObjectivesRepository from '@modules/objectives/infra/sequelize/repositories/ObjectivesRepository';
import IObjectivesRepository from '@modules/objectives/repositories/IObjectivesRepository';
import UsersRepository from '@modules/users/infra/sequelize/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IObjectivesRepository>('ObjectivesRepository', ObjectivesRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
