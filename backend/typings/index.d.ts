import { Prisma, DentalPhoto, Message, Objective, User } from '@prisma/client';

type Checkup = Prisma.CheckupGetPayload<{ include: { answers: true; photos: true } }>;
type Progress = Prisma.ProgressGetPayload<{ include: { objective: true } }>;

export { Checkup, DentalPhoto, Message, Objective, Progress, User };
