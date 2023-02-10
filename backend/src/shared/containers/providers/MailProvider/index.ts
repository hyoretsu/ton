import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import NodemailerMailProvider from './implementations/NodemailerMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
    nodemailer: container.resolve(NodemailerMailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers[mailConfig.driver]);
