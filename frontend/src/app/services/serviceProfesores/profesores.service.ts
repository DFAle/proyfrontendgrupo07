import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesores } from '../../models/Profesores/profesores';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  urlBase :string = "https://proybackendgrupo07.onrender.com/api/profesor/"
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
  getProfesorPorId(id: String): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({}),
      params: new HttpParams(),
    };
    return this._http.get(this.urlBase + id, httpOpttion);
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
    deleteProfesor(profesor: Profesores): Observable<any> {
        let httpOpttion = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          params: new HttpParams(),
        };
        return this._http.delete(this.urlBase+profesor._id, httpOpttion);
      }
       updateProfesor(profesor: Profesores): Observable<any> {
          let httpOpttion = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          };
          let body: any = JSON.stringify(profesor);
          return this._http.put(this.urlBase + profesor._id, body, httpOpttion);
        }
}
