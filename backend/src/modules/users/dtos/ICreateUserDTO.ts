export default interface ICreateUserDTO {
    name: string;
    parentName?: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: Date;
    city: string;
    neoplasia?: string;
    doctorId?: string;
    chartNumber?: string;
    appointmentsStart?: number;
    appointmentsEnd?: number;
}
