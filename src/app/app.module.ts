import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaManagerComponent } from './components/consulta/consulta-manager/consulta-manager.component';
import { HomeComponent } from './components/home/home.component';
import { MedicoManagerComponent } from './components/medico/medico-manager/medico-manager.component';
import { MedicoBuscarComponent } from './components/medico/medico-buscar/medico-buscar.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteBuscarComponent } from './components/pacientes/paciente-buscar/paciente-buscar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaManagerComponent,
    HomeComponent,
    MedicoManagerComponent,
    MedicoBuscarComponent,
    PacientesComponent,
    PacienteBuscarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
