import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaManagerComponent } from './components/consulta/consulta-manager/consulta-manager.component';
import { TipoconsultaManagerComponent } from './components/tipoConsulta/tipoconsulta-manager/tipoconsulta-manager.component';
import { ConsultaBuscarComponent } from './components/consulta/consulta-buscar/consulta-buscar.component';
import { HomeComponent } from './components/home/home.component';
import { MedicoBuscarComponent } from './components/medico/medico-buscar/medico-buscar.component';
import { MedicoManagerComponent } from './components/medico/medico-manager/medico-manager.component';
import { PacientesComponent } from './components/pacientes/paciente-manager/pacientes.component';
import { PacienteBuscarComponent } from './components/pacientes/paciente-buscar/paciente-buscar.component';
import { TipoconsultaBuscarComponent } from './components/tipoConsulta/tipoconsulta-buscar/tipoconsulta-buscar.component';

const routes: Routes = [
  {
    path: "consulta/gerenciar",
    component: ConsultaManagerComponent,
  },
  {
    path: "tipoConsulta/gerenciar",
    component: TipoconsultaManagerComponent,
  },
  {
    path: "tipoConsulta/buscar",
    component: TipoconsultaBuscarComponent,
  },
  {
    path: "consulta/buscar",
    component: ConsultaBuscarComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "medico/gerenciar",
    component: MedicoManagerComponent,
  },
  {
    path: "medico/buscar",
    component: MedicoBuscarComponent,
  },
  {
    path: "pacientes/gerenciar", 
    component: PacientesComponent, 
  },
  {
    path: "pacientes/buscar", 
    component: PacienteBuscarComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
