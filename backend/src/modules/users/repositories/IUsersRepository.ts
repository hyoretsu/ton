import { Hematology, Prisma, User } from '@prisma/client';

import ICreateUserDTO, { PeriodicInfo } from '../dtos/ICreateUserDTO';

export type CompleteMedicineRelation = Prisma.MedicineRelationGetPayload<{
    include: {
        medicine: true;
    };
}>;

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    delete(userId: string): Promise<void>;
    findAllPatients(doctorId?: string): Promise<User[]>;
    findByChartNumber(chartNumber: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByPhone(phoneNumber: string): Promise<User | null>;
    findDoctorByPatientId(id: string): Promise<User | null>;
    findHematology(userId: string): Promise<Hematology[]>;
    findMedicine(userId: string): Promise<CompleteMedicineRelation[]>;
    update(userId: string, updatedInfo: Partial<User>): Promise<User>;
    updatePeriodicInfo(patientId: string, periodicInfo: PeriodicInfo): Promise<void>;
}
