import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Components/registro/registro.component';
import { LoginComponent } from './Components/login/login.component';
import { BarcoComponent } from './Components/barco/barco.component';

import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'registro', component: RegistroComponent, title: 'Registro', canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent, title: 'Login', canActivate: [LoginGuard]},
  { path: 'barco', component: BarcoComponent, title: 'Home', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
