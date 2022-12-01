import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TipoConsultaDto } from 'src/app/models/dto/TipoConsultaDto';
import { TipoConsulta } from 'src/app/models/TipoConsulta';

@Component({
  selector: 'app-tipoconsulta-manager',
  templateUrl: './tipoconsulta-manager.component.html',
  styleUrls: ['./tipoconsulta-manager.component.css']
})
export class TipoconsultaManagerComponent {
  id!: number | undefined;
  nome!: string;
  description!: string;
  tipoConsulta!: TipoConsulta[];
  btnSalvar!: HTMLElement | null;
  btnAlterar!: HTMLElement | null;
  birthdayInput!: HTMLElement | null;
  displayAlterar: string
  displaySalvar: string

  constructor(private http: HttpClient) {
    this.displayAlterar =  "none";
    this.displaySalvar =  "block";
  }

  ngOnInit(): void {
    this.btnAlterar = document.getElementById("btnAlterar");
    this.btnSalvar = document.getElementById("btnSalvar");
    this.birthdayInput = document.getElementById("birthday");

    this.http.get<TipoConsulta[]>("https://localhost:5001/consulta/tipo/listar")
      .subscribe({
        next: (tipoConsulta) => {
          this.tipoConsulta = tipoConsulta;
        }
      });
  }

  cadastrarTipoConsulta(): void {
    let tipoConsulta: TipoConsulta = {
      id: this.id,
      name: this.nome,
      description: this.description,
    }

    this.http.post<TipoConsulta>("https://localhost:5001/consulta/tipo/criar", tipoConsulta)
      .subscribe({
        next: (tipoConsulta) => {
          this.ngOnInit();
          this.limparCampos();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao cadastrar um tipoConsulta \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  removerTipoConsulta(id: number): void {
    this.http.delete<TipoConsulta>(`https://localhost:5001/consulta/tipo/deletar/${id}`)
      .subscribe({
        next: (tipoConsulta) => {
          this.ngOnInit();
        }
      });
  }

  alterarTipoConsulta(): void {
    let tipoConsultaDto: TipoConsultaDto = {
      id: this.id,
      name: this.nome,
      description: this.description,
    }

    this.http.patch<TipoConsulta>("https://localhost:5001/consulta/tipo/alterar", tipoConsultaDto)
      .subscribe({
        next: (tipoConsulta) => {
          this.ngOnInit();
          this.limparCampos();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao tentar atualizar um médico \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  ativarBotao(): void {
    if(this.nome && this.description) {
      this.removerAtributos()
    }
    else {
      this.adicionarAtributo()
    }
  }

  alterarCampos(tipoConsulta: TipoConsulta): void {
    this.id = tipoConsulta.id;
    this.nome = tipoConsulta.name;
    this.description = tipoConsulta.description

    this.btnAlterar?.removeAttribute("disabled")
    this.displayAlterar = "block";
    this.displaySalvar = "none";
  }

  limparCampos(): void {
    this.id = undefined;
    this.nome = "";
    this.description = "";
    
    this.displayAlterar = "none";
    this.displaySalvar = "block";
    this.birthdayInput?.removeAttribute("readonly")

    this.adicionarAtributo()
  }

  removerAtributos(): void {
    this.btnSalvar?.removeAttribute("disabled")
    this.btnAlterar?.removeAttribute("disabled")
  }

  adicionarAtributo(): void {
    this.btnSalvar?.setAttribute("disabled", "true")
    this.btnAlterar?.setAttribute("disabled", "true")
  }

}
