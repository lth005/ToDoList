import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpParams, HttpUrlEncodingCodec, HttpHeaderResponse, HttpParameterCodec, HttpClient } from "@angular/common/http";
@Injectable()
export class AppService{
    private endpoint: string;
    constructor(private httpClient:HttpClient){
        this.endpoint="http://"+window.location.hostname+":8200/api"
    }
    get_vehiculos():Observable<any>{
        return this.httpClient.get(this.endpoint+"/home",
        {responseType:'json'})
    }
    login(payload):Observable<any>{
        return this.httpClient.post(this.endpoint + "/login", payload, {responseType: 'json'})
    }
    get_correo(correo):Observable<any>{
        let params = new HttpParams()
                .set('correo_electronico', correo)
        return this.httpClient.get(this.endpoint+"/get_correo",  {params})
    }
    insert_usuario(load):Observable<any>{
        return this.httpClient.post(this.endpoint+"/insert_usuario", load,
        {responseType:'json'})
    }
    get_tareas(load):Observable<any> {
        //let params = new HttpParams().set('correo_electronico', load)
        return this.httpClient.post(this.endpoint + "/get_tareas",  load, {responseType: 'json'})
    }
    get_tareas_terminadas(load):Observable<any> {
        //let params = new HttpParams().set('correo_electronico', load)
        return this.httpClient.post(this.endpoint + "/get_tareas_terminadas",  load, {responseType: 'json'})
    }

    insert_tarea(load):Observable<any>{
        return this.httpClient.post(this.endpoint+"/insert_tarea", load,
        {responseType:'json'})
    }

    update_tarea(load):Observable<any>{
        return this.httpClient.put(this.endpoint+"/update_tarea", load,
        {responseType:'json'})
    }
}