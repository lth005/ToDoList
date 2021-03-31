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

    insert_usuario(load):Observable<any>{
        return this.httpClient.post(this.endpoint+"/insert_usuario", load,
        {responseType:'json'})
    }
}