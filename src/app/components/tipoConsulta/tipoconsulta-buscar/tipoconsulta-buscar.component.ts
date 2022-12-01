import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TipoConsulta } from 'src/app/models/TipoConsulta';

@Component({
  selector: 'app-tipoconsulta-buscar',
  templateUrl: './tipoconsulta-buscar.component.html',
  styleUrls: ['./tipoconsulta-buscar.component.css']
})
export class TipoconsultaBuscarComponent {
  tipoConsultaId!: number;
  tipoConsultas!: TipoConsulta[];
  tipoConsulta!: TipoConsulta;
  btn!: HTMLElement | null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.btn = document.getElementById("btn")

    this.http.get<TipoConsulta[]>("https://localhost:5001/consulta/tipo/listar")
      .subscribe({
        next: (tipoConsultas) => {
          this.tipoConsultas = tipoConsultas;
        }
      });
  }

  ativarBotao(): void {
    if(this.tipoConsultaId) {
      this.btn?.removeAttribute("disabled");
    }
    else {
      this.btn?.setAttribute("disabled", "true");
    }
  }

  buscarTipoConsulta(): void {
    this.http.get<TipoConsulta>(`https://localhost:5001/consulta/tipo/buscar/${this.tipoConsultaId}`)
      .subscribe({
        next: (tipoConsulta) => {
          this.tipoConsulta = tipoConsulta;
          this.ngOnInit();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao buscar um médico\n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  removerConsulta(id: number): void {
    this.http.delete<TipoConsulta>(`https://localhost:5001/consulta/cancelar/${id}`)
      .subscribe({
        next: (consulta) => {
          this.buscarTipoConsulta();
          this.ngOnInit();
        }
      });
  }
}
