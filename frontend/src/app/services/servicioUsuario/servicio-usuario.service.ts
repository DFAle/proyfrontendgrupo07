import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {

  constructor(private http: HttpClient) {

   }
   getUsuarios():Observable<any>{
      let httpOpttion = {
        headers: new HttpHeaders({

        }),
        params:new HttpParams()
      }
      return this.http.get('http://localhost:3000/api/usuario',httpOpttion);

      
   }
}
