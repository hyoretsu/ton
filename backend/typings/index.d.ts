import { DentalPhoto, Objective, Prisma, User } from '@prisma/client';

import { CompleteContentMessage as ContentMessage } from '../src/modules/contents/repositories/IContentsRepository';

type Appointment = Prisma.AppointmentGetPayload<{ include: { doctor: true; patient: true } }>;
type Checkup = Prisma.CheckupGetPayload<{ include: { answers: true; photos: true } }>;
type Message = Prisma.MessageGetPayload<{ include: { sender: true } }>;
type Progress = Prisma.ProgressGetPayload<{ include: { objective: true } }>;

export { Appointment, Checkup, ContentMessage, DentalPhoto, Message, Objective, Progress, User };
