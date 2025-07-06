import {HttpClient,HttpHandler,HttpHeaders,HttpParams,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { Usuario } from '../../models/Usuarios/usuario';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuarioService {
  urlBase: string = 'https://proybackendgrupo07.onrender.com/api/usuario/';

  constructor(private http: HttpClient) {}
  getUsuarios(): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({}),
      params: new HttpParams(),
    };
    return this.http.get(this.urlBase, httpOpttion);
  }
  getUsuarioPorId(id: string): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({}),
      params: new HttpParams(),
    };
    return this.http.get(this.urlBase + id, httpOpttion);
  }
  updateUsuario(usuario: Usuario): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body: any = JSON.stringify(usuario);
    return this.http.put(this.urlBase + usuario._id, body, httpOpttion);
  }
  addUsuario(usuario: Usuario): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body: any = JSON.stringify(usuario);
    return this.http.post(this.urlBase, body, httpOpttion);
  }

  deleteUsuario(usuario: Usuario): Observable<any> {
    let httpOpttion = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams(),
    };
    return this.http.delete(this.urlBase+usuario._id, httpOpttion);
  }
}