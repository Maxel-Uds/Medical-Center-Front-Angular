import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaManagerComponent } from './components/consulta/consulta-manager/consulta-manager.component';
import { HomeComponent } from './components/home/home.component';
import { MedicoBuscarComponent } from './components/medico/medico-buscar/medico-buscar.component';
import { MedicoManagerComponent } from './components/medico/medico-manager/medico-manager.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';

const routes: Routes = [
  {
    path: "consulta/gerenciar",
    component: ConsultaManagerComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
