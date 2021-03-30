import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetHomeComponent } from './views/home/home.component';
import { GetLoginComponent } from './views/login/login.component';
const routes: Routes = [{
    path: 'login',
    component: GetLoginComponent

  },
  {
    path: 'home',
    component: GetHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
