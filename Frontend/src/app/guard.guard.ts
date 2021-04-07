import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, private service: AppService) {}
  canActivate(): boolean {
    //if (this.service.get_tareas(localStorage.getItem('correo')) && this.service.get_tareas_terminadas(localStorage.getItem('correo'))) {
      if(this.service.get_session()){
        return true;
      }
     else {
      this.service.reset_session();
      this.router.navigate(['login']);
      return false;
    }
    
  }
}
