import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../../models/actividad/actividad';

@Injectable({ providedIn: 'root' })
export class ActividadService {
  
  private apiUrl = 'https://proybackendgrupo07.onrender.com/api/actividad/'; // URL to web api

  constructor(private http: HttpClient) { }

  public consumirActividad(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams(),
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  addActividad(actividad: Actividad): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body: any = JSON.stringify(actividad);
    return this.http.post(this.apiUrl, body, httpOpttion);
  }

  deleteActividad(actividad: Actividad): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams(),
    };
    return this.http.delete(this.apiUrl + actividad._id, httpOpttion);
  }
  getActividadId(id: string): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams(),
    };
    return this.http.get(this.apiUrl + id, httpOpttion);
  }

  updateActividad(actividad: Actividad): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body: any = JSON.stringify(actividad);
    return this.http.put(this.apiUrl + actividad._id, body, httpOpttion);
  }

  suscribirseActividad(idActividad: string, usuarioId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}suscribirse/${idActividad}`, { usuarioId });
  }

  getActividadesPorUsuario(usuarioId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}usuario/${usuarioId}`);
  }

  getHistorialUsuario(usuarioId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}historial/usuario/${usuarioId}`);
  }

}
