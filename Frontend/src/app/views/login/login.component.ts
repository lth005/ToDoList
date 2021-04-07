import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { title } from 'process';
import { Router } from '@angular/router';
import {  NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';
import uniqid from 'uniqid'

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

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
        
        (async () => {

            const { value: email } = await Swal.fire({
              title: 'Recuperar la contraseña',
              input: 'email',
              inputLabel: 'Ingrese Correo Electronico',
              inputPlaceholder: 'ejemplo@gmail.com',
              showCancelButton: true,
            cancelButtonText: "Cancel",
              allowOutsideClick: false
            })
            var usuario={
                "clave": uniqid.time(),
                "email":email
            };
            this.service.update_clave(usuario).subscribe(
                data => response = data,
                err => {
                    console.log("Error al consultar el servicio");
                },
                () => {
                   
                    if (response.length==0){
                        
                        Swal.fire("Correo inexistente");
                    }else{
                        Swal.fire({
                            title: 'Ingrese Clave',
                            input: 'text',
                            confirmButtonText: 'Aceptar',
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false
                          
                          }).then((result) => {
                            if (result.isConfirmed) {
                                this.service.get_clave(usuario).subscribe(
                                    data => response = data,
                                    err => {
                                        console.log("Error al consultar el servicio");
                                    },
                                    () => {
                                        Swal.fire({
                                            title: 'Ingrese Nueva Contraseña',
                                            html:
                                                '<label for="label1" class="form-label">Nueva Contraseña:</label>'+
                                              '<input type="password" id="swal-input1" class="swal2-input">' +
                                              '<label for="label2" class="form-label">Confirmar Contraseña:</label>'+
                                              '<input type="password" id="swal-input2" class="swal2-input">',
                                              allowOutsideClick: false
                                          }).then((result)=>{
                                            if (result.isConfirmed) {
                                                var inputValue = (<HTMLInputElement>document.getElementById('swal-input1')).value;
                                                var inputValue2 = (<HTMLInputElement>document.getElementById('swal-input2')).value;
                                               
                                                if(inputValue==inputValue2){
                                                        var actualizar_usuario={
                                                            "contrasenia": inputValue2,
                                                            "email":email
                                                        };
                                                        
                                                        this.service.update_contrasenia(actualizar_usuario).subscribe(
                                                            data => response = data,
                                                            err => {
                                                                console.log("Error al consultar el servicio");
                                                            },
                                                            () => {
                                                                Swal.fire("CONTRASEÑA ACTUALIZADA");
                                                                this.router.navigateByUrl('/login');
                                                            })

                                                }else{
                                                   Swal.fire("ERROR DE AMBAS CONTRASEÑASS")
                                                }
                                            }
                                          })
                                    }
                                )
                            }
                          })
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
                Swal.fire("VERIFIQUE SUS DATOS");
            },
            () => {
                try{
                    if (response){
                        localStorage.setItem('correo', this.LoadingData.correo_electronico);
                        localStorage.setItem('id', response.id);
                        this.service.set_session(response.token);
                        Swal.fire('Bienvenido');
                        this.router.navigate(['tareas']);
                    }else{
                        this.loading = false;
                        Swal.fire("VERIFIQUE SUS DATOS");
                    }
                    this.loading = false;
                }catch(error){
                    this.loading = false;
                    Swal.fire("VERIFIQUE SUS DATOS");
                }
                this.loading = false;
            }
        );
        this.loading = false;
    }
}