export interface Paciente {
    id?: number;
    name: string;
    email: string;
    phone: string;
    birthday: Date,
    documentNumber: string;
    createdAt?: Date;
}