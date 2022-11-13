import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaManagerComponent } from './components/consulta/consulta-manager/consulta-manager.component';

const routes: Routes = [
  {
    path: "consulta/gerenciar",
    component: ConsultaManagerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
