import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginFinalService {

public getUserCorreo(): string {
  return localStorage.getItem("correo") || '';
}


  hostBase: string;

  constructor(private _http: HttpClient) {
   // this.hostBase = 'http://localhost:3000/api/usuario/';
   this.hostBase = 'https://proybackendgrupo07.onrender.com/api/usuario/';
  }

  
 

public loginNormal(login: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify({ login, password });
    console.log(body);
    return this._http.post(this.hostBase + 'auth/login', body, httpOptions);
  }

  //Este metodo verifica si el usuario esta registrado en la base de datos
  public verificarUsuario(login: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body = JSON.stringify({ login });
    console.log(body);
    return this._http.post(this.hostBase + 'auth/verificar', body,httpOptions);
  }

  

public almacenarDatos(username: string, foto: string | null, correo: string, rol: string, userid: string): void {
  const fotoFinal = foto && foto.trim() !== '' ? foto : 'assets/img/user2.png';

  localStorage.setItem("correo", correo);
  localStorage.setItem("user", username);
  localStorage.setItem("foto", fotoFinal);
  localStorage.setItem("rol", rol);
  localStorage.setItem("userid", userid);
  console.log("Rol del usuario: " + rol);
  console.log("Usuario id: " + userid);
}
public logout() {
  localStorage.removeItem("correo");
  localStorage.removeItem("user");
  localStorage.removeItem("foto");
  localStorage.removeItem("userid");
  localStorage.removeItem("rol");
  console.log("Adios: ");
}

public userLoggedIn(){
  return !!localStorage.getItem("user");
}

public userLogged(){
  return localStorage.getItem("user");
}

public rolLogged(): string {
  return localStorage.getItem("rol") ?? 'Invitado';
}

public userLoggedFoto(): string {
  return localStorage.getItem("foto")!;
}

public idLogged(){
  return localStorage.getItem("userid");
}


    public clearLocalStorage() {
 //borro el vble almacenado mediante el storage
localStorage.removeItem("correo");
 localStorage.removeItem("user");
 localStorage.removeItem("foto");
 localStorage.removeItem("userid");
  localStorage.removeItem("rol");
 console.log("Adios: ");
 } 
}
