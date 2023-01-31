import { DentalPhoto, Message, Objective, Prisma, User } from '@prisma/client';

type Appointment = Prisma.AppointmentGetPayload<{ include: { doctor: true; patient: true } }>;
type Checkup = Prisma.CheckupGetPayload<{ include: { answers: true; photos: true } }>;
type Progress = Prisma.ProgressGetPayload<{ include: { objective: true } }>;

export { Appointment, Checkup, DentalPhoto, Message, Objective, Progress, User };
