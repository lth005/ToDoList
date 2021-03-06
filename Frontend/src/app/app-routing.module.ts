import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetHomeComponent } from './views/home/home.component';
import { GetLoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { GetTareasComponent } from './views/tareas/tareas.component';
import { GuardGuard } from './guard.guard';

const routes: Routes = [{
    path: 'login',
    component: GetLoginComponent
  },
  {
    path: 'home',
    component: GetHomeComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'tareas',
    component: GetTareasComponent,
    canActivate:[GuardGuard]
  }, 
  { 
    path: '**',
     component:GetLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
