import { Content, DentalPhoto, Objective, Prisma, User } from '@prisma/client';

import { CompleteContentMessage as ContentMessage } from '../src/modules/contents/repositories/IContentsRepository';
import { CompleteCheckup as Checkup } from '../src/modules/users/repositories/ICheckupsRepository';

type Appointment = Prisma.AppointmentGetPayload<{ include: { doctor: true; patient: true } }>;
type Message = Prisma.MessageGetPayload<{ include: { sender: true } }>;
type Progress = Prisma.ProgressGetPayload<{ include: { objective: true } }>;

export { Appointment, Checkup, Content, ContentMessage, DentalPhoto, Message, Objective, Progress, User };
