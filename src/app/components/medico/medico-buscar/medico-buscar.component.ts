import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/models/Consulta';
import { Medico } from 'src/app/models/Medico';

@Component({
  selector: 'app-medico-buscar',
  templateUrl: './medico-buscar.component.html',
  styleUrls: ['./medico-buscar.component.css']
})
export class MedicoBuscarComponent implements OnInit {

  medicoId!: number;
  medicos!: Medico[];
  medico!: Medico;
  btn!: HTMLElement | null;
  consultas!: Consulta[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.btn = document.getElementById("btn")

    this.http.get<Medico[]>("https://localhost:5001/medico/listar")
      .subscribe({
        next: (medicos) => {
          this.medicos = medicos;
        }
      });
  }

  ativarBotao(): void {
    if(this.medicoId) {
      this.btn?.removeAttribute("disabled");
    }
    else {
      this.btn?.setAttribute("disabled", "true");
    }
  }

  buscarMedico(): void {
    this.http.get<Medico>(`https://localhost:5001/medico/buscar/${this.medicoId}`)
      .subscribe({
        next: (medico) => {
          this.medico = medico;
          this.consultas = medico.consultas?.length === 0 ? undefined : medico.consultas;
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
          this.buscarMedico();
          this.ngOnInit();
        }
      });
  }
}
