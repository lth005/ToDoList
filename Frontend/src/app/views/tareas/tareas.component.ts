import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import {  NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';

@Component({
    selector: 'tareas',
    templateUrl: './tareas.component.html'
})

export class GetTareasComponent{

    public listado_tareas:any[];
    public listado_tareas_terminadas:any[];

    constructor(public service:AppService){
        this.listado_tareas=[];
        this.listado_tareas_terminadas=[];
    }

    public Tareas = {
        id_tarea: "",
        titulo: "",
        descripcion: "",
        id_estado_tarea: "1"
    }

    public correo_electronico = {
        correo: ""
    }

    ngOnInit(){
        this.get_tareas();
        this.get_tareas_terminadas();
        this.correo_electronico.correo = localStorage.getItem('correo');
    }

    get_tareas(){
        var correo;
        var response;
        var load = {
            correo_electronico: localStorage.getItem('correo')
        }
        console.log(correo = localStorage.getItem('correo'));
        this.service.get_tareas(load).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_tareas=response;
            }
        )
    }

    get_tareas_terminadas(){
        var correo;
        var response;
        var load = {
            correo_electronico: localStorage.getItem('correo')
        }
        console.log(correo = localStorage.getItem('correo'));
        this.service.get_tareas_terminadas(load).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_tareas_terminadas=response;
            }
        )
    }
}