import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/Medico';
import { MedicoDto } from 'src/app/models/dto/MedicoDto';

@Component({
  selector: 'app-medico-manager',
  templateUrl: './medico-manager.component.html',
  styleUrls: ['./medico-manager.component.css']
})
export class MedicoManagerComponent implements OnInit {

  id!: number | undefined;
  nome!: string;
  email!: string;
  phone!: string;
  crm!: string;
  medicos!: Medico[];
  btnSalvar!: HTMLElement | null;
  btnAlterar!: HTMLElement | null;
  crmInput!: HTMLElement | null;
  displayAlterar: string
  displaySalvar: string

  constructor(private http: HttpClient) {
    this.displayAlterar =  "none";
    this.displaySalvar =  "block";
  }

  ngOnInit(): void {
    this.btnAlterar = document.getElementById("btnAlterar");
    this.btnSalvar = document.getElementById("btnSalvar");
    this.crmInput = document.getElementById("crm");

    this.http.get<Medico[]>("https://localhost:5001/medico/listar")
      .subscribe({
        next: (medicos) => {
          this.medicos = medicos;
        }
      });
  }

  cadastrarMedico(): void {
    let medico: Medico = {
      name: this.nome,
      email: this.email,
      phone: this.phone,
      crm: this.crm
    }

    this.http.post<Medico>("https://localhost:5001/medico/cadastrar", medico)
      .subscribe({
        next: (medico) => {
          this.ngOnInit();
          this.limparCampos();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao cadastrar um médico \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  removerMedico(id: number): void {
    this.http.delete<Medico>(`https://localhost:5001/medico/deletar/${id}`)
      .subscribe({
        next: (medico) => {
          this.ngOnInit();
        }
      });
  }

  alterarMedico(): void {
    let medicoDto: MedicoDto = {
      id: this.id,
      name: this.nome,
      email: this.email,
      phone: this.phone,
      crm: this.crm
    }

    this.http.patch<Medico>("https://localhost:5001/medico/alterar", medicoDto)
      .subscribe({
        next: (medico) => {
          this.ngOnInit();
          this.limparCampos();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao tentar atualizar um médico \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  ativarBotao(): void {
    if(this.nome && this.email && this.phone && this.crm) {
      this.removerAtributos()
    }
    else {
      this.adicionarAtributo()
    }
  }

  alterarCampos(medico: Medico): void {
    this.id = medico.id;
    this.nome = medico.name;
    this.email = medico.email;
    this.phone = medico.phone;
    this.crm = medico.crm;
    this.crmInput?.setAttribute("readonly", "true")

    this.btnAlterar?.removeAttribute("disabled")
    this.displayAlterar = "block";
    this.displaySalvar = "none";
  }

  limparCampos(): void {
    this.nome = "";
    this.email = "";
    this.phone = "";
    this.crm = "";
    this.id = undefined;
    this.displayAlterar = "none";
    this.displaySalvar = "block";
    this.crmInput?.removeAttribute("readonly")

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
