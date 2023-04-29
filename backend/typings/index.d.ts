import { DentalPhoto, Hematology, Medicine, Objective, Prisma, User } from '@prisma/client';

import {
    CompleteContent as Content,
    CompleteContentMessage as ContentMessage,
} from '../src/modules/contents/repositories/IContentsRepository';
import { CompleteCheckup as Checkup } from '../src/modules/users/repositories/ICheckupsRepository';

type Appointment = Prisma.AppointmentGetPayload<{ include: { doctor: true; patient: true } }>;
type Message = Prisma.MessageGetPayload<{ include: { sender: true } }>;
type ObjectiveNotification = Prisma.ObjectiveNotificationGetPayload<{ include: { objective: true } }>;
type Progress = Prisma.ProgressGetPayload<{ include: { objective: true } }>;

export {
    Appointment,
    Checkup,
    Content,
    ContentMessage,
    DentalPhoto,
    Hematology,
    Medicine,
    Message,
    Objective,
    ObjectiveNotification,
    Progress,
    User,
};
