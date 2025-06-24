import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../../models/actividad/actividad';


@Injectable({ providedIn: 'root' })
export class ActividadService {
  private apiUrl = 'https:proybackendgrupo07.onrender.com/api/actividad';

  constructor(private http: HttpClient) {}


  //ale

  public consumirActividad():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
    }
    return this.http.get(this.apiUrl, httpOptions);
  }
  addActividad(actividad:Actividad): Observable<any> {
      let httpOpttion = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      let body: any = JSON.stringify(actividad);
      return this.http.post(this.apiUrl, body, httpOpttion);
    }
}
