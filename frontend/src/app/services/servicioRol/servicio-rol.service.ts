import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioRolService {
  urlBase:string = 'https://proybackendgrupo07.onrender.com/api/rol/';
  constructor(private http: HttpClient) {

   }
   getRoles():Observable<any>{
      let httpOpttion = {
        headers: new HttpHeaders({

        }),
        params:new HttpParams()
      }
      return this.http.get(this.urlBase,httpOpttion); 
   }
}
