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

    
    insert_tarea(){
        var response;
         this.service.insert_tarea(this.Tareas).subscribe(
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
                this.limpiar_tareas();
                this.get_tareas(); 
                Swal.fire({
                  title:"Tarea Guardada Exitosamente",
                  icon:"success",
                  
                })
            
            }
        );
    
      }
    
      limpiar_tareas(){
        this.Tareas={
            id_tarea: "",
            titulo: "",
            descripcion: "",
            id_estado_tarea: ""
        }
      }

      getDatosTareasForm(v){
        this.Tareas = {
            id_tarea: v.id_tarea,
            titulo: v.titulo,
            descripcion: v.descripcion,
            id_estado_tarea: v.id_estado_tarea
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
               this.get_tareas();           
            this.limpiar_tareas();
              
           }
       )
   
    }
   
}