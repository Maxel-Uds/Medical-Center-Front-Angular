import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaManagerComponent } from './components/consulta/consulta-manager/consulta-manager.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "consulta/gerenciar",
    component: ConsultaManagerComponent,
  },
  {
    path: "",
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
