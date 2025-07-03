import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioRegistroActividadService {
private apiUrl = 'https://proybackendgrupo07.onrender.com/api/registroActividad/historial/usuario/'; // URL to web api
  constructor(private http: HttpClient) { }


   getUsuarioId(id: string): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({
        
      }),
      params: new HttpParams(),
    };
    return this.http.get(this.apiUrl + id, httpOpttion);
  }
}
