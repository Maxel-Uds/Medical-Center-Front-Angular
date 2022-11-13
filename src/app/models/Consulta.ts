import { Medico } from "./Medico";
import { Paciente } from "./Paciente";
import { TipoConsulta } from "./TipoConsulta";

export interface Consulta {
    id?: number;
    consultationDate: Date;
    tipoConsultaId: number;
    tipoConsulta?: TipoConsulta;
    pacienteId: number;
    paciente?: Paciente;
    medicoId: number;
    medico?: Medico;
}