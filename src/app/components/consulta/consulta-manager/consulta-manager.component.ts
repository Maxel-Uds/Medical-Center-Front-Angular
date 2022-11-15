import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Consulta } from 'src/app/models/Consulta';
import { Paciente } from 'src/app/models/Paciente';
import { Medico } from 'src/app/models/Medico';
import { TipoConsulta } from 'src/app/models/TipoConsulta';

@Component({
  selector: 'app-consulta-manager',
  templateUrl: './consulta-manager.component.html',
  styleUrls: ['./consulta-manager.component.css']
})

export class ConsultaManagerComponent implements OnInit {
  data!: Date;
  medicoId!: number;
  pacienteId!: number;
  tipoId!: number;
  consultas!: Consulta[];
  pacientes!: Paciente[];
  medicos!: Medico[];
  tipos!: TipoConsulta[];
  dataMinima: string;

  constructor(private http: HttpClient) {
    this.dataMinima = this.formatarData();
  }

  ngOnInit(): void {
    this.http.get<Consulta[]>("https://localhost:5001/consulta/listar")
      .subscribe({
        next: (consultas) => {
          this.consultas = consultas;
        }
      });

      this.http.get<Paciente[]>("https://localhost:5001/paciente/listar")
      .subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
        }
      });

      this.http.get<Medico[]>("https://localhost:5001/medico/listar")
      .subscribe({
        next: (medicos) => {
          this.medicos = medicos;
        }
      });

      this.http.get<TipoConsulta[]>("https://localhost:5001/consulta/tipo/listar")
      .subscribe({
        next: (tipos) => {
          this.tipos = tipos;
        }
      });
  }

  remover(id: number): void {
    this.http.delete<Consulta>(`https://localhost:5001/consulta/cancelar/${id}`)
      .subscribe({
        next: (consulta) => {
          this.ngOnInit();
        }
      });
  }

  agendarConsulta(): void {
    let consulta: Consulta = {
      consultationDate: this.data,
      medicoId: this.medicoId,
      pacienteId: this.pacienteId,
      tipoConsultaId: this.tipoId
    };

    this.http.post<Consulta>("https://localhost:5001/consulta/agendar", consulta)
      .subscribe({
        next: (consulta) => {
          this.ngOnInit();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao tentar agendar consulta \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  formatarData(): string {
    let data = new Date();
    return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
  }

  ativarBotao(): void {
    let btn = document.getElementById("btn");
    if(this.data && this.medicoId && this.tipoId && this.pacienteId) {
      btn?.removeAttribute("disabled")
    }
    else {
      btn?.setAttribute("disabled", "true")
    }
  }
}
