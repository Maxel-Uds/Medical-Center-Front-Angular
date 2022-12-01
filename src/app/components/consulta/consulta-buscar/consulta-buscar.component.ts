import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Consulta } from 'src/app/models/Consulta';

@Component({
  selector: 'app-consulta-buscar',
  templateUrl: './consulta-buscar.component.html',
  styleUrls: ['./consulta-buscar.component.css']
})
export class ConsultaBuscarComponent {
  consultaId!: number;
  consultas!: Consulta[];
  consulta!: Consulta;
  btn!: HTMLElement | null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.btn = document.getElementById("btn")

    this.http.get<Consulta[]>("https://localhost:5001/consulta/listar")
      .subscribe({
        next: (consultas) => {
          this.consultas = consultas;
        }
      });
  }

  ativarBotao(): void {
    if(this.consultaId) {
      this.btn?.removeAttribute("disabled");
    }
    else {
      this.btn?.setAttribute("disabled", "true");
    }
  }

  buscarConsulta(): void {
    this.http.get<Consulta>(`https://localhost:5001/consulta/buscar/${this.consultaId}`)
      .subscribe({
        next: (consulta) => {
          this.consulta = consulta;
          // this.consultas = consulta.consultas?.length === 0 ? undefined : consulta.consultas;
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
          this.buscarConsulta();
          this.ngOnInit();
        }
      });
  }

}
