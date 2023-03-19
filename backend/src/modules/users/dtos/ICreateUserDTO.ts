type Hematology = {
    redCells: number;
    platelets: number;
    leukocytes: number;
    neutrophils: number;
};

type Medicine = {
    name: string;
    dosage: string;
};

export type PeriodicInfo = {
    hematology?: Hematology;
    medicine?: Medicine[];
    medicineEnd?: Date;
};

export default interface ICreateUserDTO {
    name: string;
    parentName?: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: Date;
    city: string;
    neoplasia?: string;
    hematology?: Hematology;
    medicine?: Medicine[];
    medicineEnd?: Date;
    doctorId?: string;
    chartNumber?: string;
    appointmentsStart?: number;
    appointmentsEnd?: number;
}
