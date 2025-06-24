import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesores } from '../../models/Profesores/profesores';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  urlBase :string = "http://localhost:3000/api/profesor/"
  constructor(private _http:HttpClient) { 
    
  }

  public getProfesores():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
    }
    return this._http.get(this.urlBase, httpOptions);
  }

   addProfesor(profesor: Profesores): Observable<any> {
      let httpOpttion = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      let body: any = JSON.stringify(profesor);
      return this._http.post(this.urlBase, body, httpOpttion);
    }
}
