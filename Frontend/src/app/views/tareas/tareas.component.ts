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
    public listado_estado_tarea:any[];
    public tarea:any[];
    router: any;

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
        this.get_estado_tarea();
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

    get_id_tarea(){
        var response;
        this.service.get_tarea().subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.tarea=response;
                localStorage.setItem('temporal', response[0].id_tarea);
                console.log(response);
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

    
    insert_tarea(){
        var response;
        var load = {
            id_usuario:localStorage.getItem('id'),
            id_tarea: this.Tareas.id_tarea,
            titulo: this.Tareas.titulo,
            descripcion: this.Tareas.descripcion,
            id_estado_tarea: 1
        }
         this.service.insert_tarea(load).subscribe(
            data => response = data,
            err => {
                console.log(response);
                console.log("Error al consultar el servicio");
                Swal.fire({
                  title:"FALLO EN REGISTRO VERIFIQUE SUS DATOS",
                  icon:"warning"
                })
            },
            ()=>{
                this.get_tareas(); 
                Swal.fire({
                  title:"Tarea Guardada Exitosamente",
                  icon:"success",
                  
                })
            
            }
        );
    
    }
    
    /*limpiar_tareas(){
        this.Tareas={
            id_tarea: "",
            titulo: "",
            descripcion: "",
            id_estado_tarea: ""
        }
    }*/

    getDatosTareasForm(tareas){
        this.Tareas = {
            id_tarea: tareas.id_tarea,
            titulo: tareas.titulo,
            descripcion: tareas.descripcion,
            id_estado_tarea: tareas.id_estado_tarea
        }
    }
   
    update_tarea(){
       var response;
       this.service.update_tarea(this.Tareas).subscribe(
           data=>response=data,
           err => {
               console.log("Error al consultar el servicio");
           },
           ()=>{
               this.Tareas={
                   id_tarea:"",
                   titulo:"",
                   descripcion:"",
                   id_estado_tarea:""
               }
               this.get_tareas(); 
               this.get_tareas_terminadas();          
               //this.limpiar_tareas();
              
           }
       )
    }

    getDatosTareasTerminadasForm(tareas){
        this.Tareas = {
            id_tarea: tareas.id_tarea,
            titulo: tareas.titulo,
            descripcion: tareas.descripcion,
            id_estado_tarea: tareas.id_estado_tarea
        }
    }
   
    get_estado_tarea(){
        var correo;
        var response;
        var load = {
            correo_electronico: localStorage.getItem('correo')
        }
        console.log(correo = localStorage.getItem('correo'));
        this.service.get_estado_tarea().subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_estado_tarea=response;
            }
        )
    }
}