import { Prisma, DentalPhoto, Message, Objective, Progress, User } from '@prisma/client';

type Checkup = Prisma.CheckupGetPayload<{ include: { answers: true; photos: true } }>;

export { Checkup, DentalPhoto, Message, Objective, Progress, User };
