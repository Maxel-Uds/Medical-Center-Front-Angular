import { Consulta } from "./Consulta";

export interface Medico {
    id?: number;
    name: string;
    email: string;
    phone: string;
    crm: string;
    createdAt?: Date;
    consultas?: Consulta[];
}