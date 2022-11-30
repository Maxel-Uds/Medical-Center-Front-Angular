import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Consulta } from 'src/app/models/Consulta';
import { Paciente } from 'src/app/models/Paciente';

@Component({
  selector: 'app-paciente-buscar',
  templateUrl: './paciente-buscar.component.html',
  styleUrls: ['./paciente-buscar.component.css']
})
export class PacienteBuscarComponent {
  pacienteId!: number;
  pacientes!: Paciente[];
  paciente!: Paciente;
  btn!: HTMLElement | null;
  consultas!: Consulta[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.btn = document.getElementById("btn")

    this.http.get<Paciente[]>("https://localhost:5001/paciente/listar")
      .subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
        }
      });
  }

  ativarBotao(): void {
    if(this.pacienteId) {
      this.btn?.removeAttribute("disabled");
    }
    else {
      this.btn?.setAttribute("disabled", "true");
    }
  }

  buscarPaciente(): void {
    this.http.get<Paciente>(`https://localhost:5001/paciente/listar/${this.pacienteId}`)
      .subscribe({
        next: (paciente) => {
          this.paciente = paciente;
          // this.consultas = paciente.consultas?.length === 0 ? undefined : paciente.consultas;
          this.ngOnInit();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao buscar um médico\n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  removerConsulta(id: number): void {
    this.http.delete<Consulta>(`https://localhost:5001/consulta/cancelar/${id}`)
      .subscribe({
        next: (consulta) => {
          this.buscarPaciente();
          this.ngOnInit();
        }
      });
  }

  
}
