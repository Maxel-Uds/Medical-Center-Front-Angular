import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PacienteDto } from 'src/app/models/dto/PacienteDto';
import { Paciente } from 'src/app/models/Paciente';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  
  id!: number | undefined;
  nome!: string;
  email!: string;
  phone!: string;
  birthday?: Date;
  documentNumber!: string;
  pacientes!: Paciente[];
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

    this.http.get<Paciente[]>("https://localhost:5001/paciente/listar")
      .subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
        }
      });
  }

  cadastrarPaciente(): void {
    let paciente: Paciente = {
      id: this.id,
      name: this.nome,
      email: this.email,
      phone: this.phone,
      birthday: this.birthday,
      documentNumber: this.documentNumber
    }

    this.http.post<Paciente>("https://localhost:5001/paciente/cadastrar", paciente)
      .subscribe({
        next: (paciente) => {
          this.ngOnInit();
          this.limparCampos();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao cadastrar um paciente \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  removerPaciente(id: number): void {
    this.http.delete<Paciente>(`https://localhost:5001/paciente/deletar/${id}`)
      .subscribe({
        next: (paciente) => {
          this.ngOnInit();
        }
      });
  }

  alterarPaciente(): void {
    let pacienteDto: PacienteDto = {
      id: this.id,
      name: this.nome,
      email: this.email,
      phone: this.phone,
      birthday: this.birthday,
      documentNumber: this.documentNumber
    }

    this.http.patch<Paciente>("https://localhost:5001/paciente/alterar", pacienteDto)
      .subscribe({
        next: (paciente) => {
          this.ngOnInit();
          this.limparCampos();
        },
        error: (erro) => {
          alert(`Ocorreu um erro ao tentar atualizar um médico \n Erro: ${JSON.stringify(erro.error.errors)}`)
        },
    });
  }

  ativarBotao(): void {
    if(this.nome && this.email && this.phone && this.birthday && this.documentNumber) {
      this.removerAtributos()
    }
    else {
      this.adicionarAtributo()
    }
  }

  alterarCampos(paciente: Paciente): void {
    this.id = paciente.id;
    this.nome = paciente.name;
    this.email = paciente.email;
    this.phone = paciente.phone;
    this.birthdayInput?.setAttribute("readonly", "true")
    this.birthday = paciente.birthday
    this.documentNumber = paciente.documentNumber;

    this.btnAlterar?.removeAttribute("disabled")
    this.displayAlterar = "block";
    this.displaySalvar = "none";
  }

  limparCampos(): void {
    this.nome = "";
    this.email = "";
    this.phone = "";
    this.birthday = undefined;
    this.id = undefined;
    this.documentNumber = "";
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
