import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { title } from 'process';
import { Router } from '@angular/router';
import {  NgForm } from '@angular/forms';

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
                        this.router.navigateByUrl('/home');
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