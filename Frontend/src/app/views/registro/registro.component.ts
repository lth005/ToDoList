import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControlDirective } from '@angular/forms';
import swal from 'sweetalert2';
import { AppService } from '../../app.service';


@Component({
  selector: 'registro',
  templateUrl: './registro.component.html'
})

export class RegistroComponent {
  public usuario={
    nombre_usuario:"",
    correo_electronico: "",
    contrasenia:"",
    id_rol:"2",
    id_estado:"1"
  }  
  
  constructor(public service: AppService, private router: Router) {
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    localStorage.clear();
  }

  
 

  insert_usuario(){
    var response;
     this.service.insert_usuario(this.usuario).subscribe(
        data => response = data,
        err => {
            console.log(response);
            console.log("Error al consultar el servicio");
            swal.fire({
              title:"FALLO EN REGISTRO VERIFIQUE SUS DATOS",
              icon:"warning"
            })
        },
        ()=>{
            this.limpiar_usuario();
            this.router.navigateByUrl('/home');
            swal.fire({
              title:"Usuario Guardado Exitosamente",
              icon:"success",
              
            })
        }
    );

  }

  limpiar_usuario(){
    this.usuario={
        nombre_usuario:"",
        correo_electronico: "",
        contrasenia:"",
        id_rol:"",
        id_estado:""
    }
  }
}