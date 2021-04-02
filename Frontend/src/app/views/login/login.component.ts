import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { title } from 'process';
import { Router } from '@angular/router';
import {  NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

/*const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
  })
  
  if (email) {
    Swal.fire(`Entered email: ${email}`)
  }*/
export class GetLoginComponent{
    public submitted = false;
    public loading = false;
    public LoadingData = {
        correo_electronico:"",
        contrasenia:""
    }
    
    constructor(public service:AppService, private router:Router){

    }
    correo(){
        var response;
        var id;
        (async () => {

            const { value: email } = await Swal.fire({
              title: 'Input email address',
              input: 'email',
              inputLabel: 'Your email address',
              inputPlaceholder: 'Enter your email address'
            })
            
            this.service.get_correo(email).subscribe(
                data => response = data,
                err => {
                    console.log("Error al consultar el servicio");
                },
                () => {
                    
                    if (response.length == 0){
                        
                        Swal.fire("ERROR");
                    }else{
                        id=response;
                        Swal.fire("Existe");
                    }
                }
            );
            
            
            
        })()
    }

    login() {
        this.submitted = false;
        this.loading = true;
        var response;
        var Load = {
            correo_electronico: this.LoadingData.correo_electronico,
            contrasenia: this.LoadingData.contrasenia
        };
        this.service.login(Load).subscribe(
            data => response = data,
            err => {
                this.loading = false;
            },
            () => {
                try{
                    if (response.length > 0){
                        localStorage.setItem('correo', this.LoadingData.correo_electronico);
                        localStorage.setItem('id', response[0].id_usuario);
                        console.log(this,response[0].id_usuario);
                        console.log(this,this.LoadingData.correo_electronico);
                        Swal.fire('Bienvenido');
                        this.router.navigateByUrl('/tareas');
                    }else{
                        this.loading = false;
                    }
                    this.loading = false;
                }catch(error){
                    this.loading = false;
                }
            }
        );
    }
}