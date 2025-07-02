import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginFinalService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = 'http://localhost:3000/api/usuario/';
  // this.hostBase = 'https://proybackendgrupo07.onrender.com/api/usuario/';
  }

  /*
  public loginNormal(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify({ username, password });
    return this._http.post(this.hostBase + 'login', body, httpOptions);
  }
*/

public loginNormal(login: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify({ login, password });
    console.log(body);
    return this._http.post(this.hostBase + 'login', body, httpOptions);
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
  console.log(username);

  // Solo validamos si la foto está vacía
  const fotoFinal = foto && foto.trim() !== '' ? foto : 'assets/img/user2.png';

  sessionStorage.setItem("correo", correo);
  sessionStorage.setItem("user", username);
  sessionStorage.setItem("foto", fotoFinal);
  sessionStorage.setItem("rol", rol);
  sessionStorage.setItem("userid", userid);

  console.log("Rol del usuario: " + rol);
  console.log("Usuario id: " + userid);
}


  public logout() {
 //borro el vble almacenado mediante el storage
 sessionStorage.removeItem("correo");
 sessionStorage.removeItem("user");
 sessionStorage.removeItem("foto");
 sessionStorage.removeItem("userid");
 console.log("Adios: ");
 sessionStorage.removeItem("rol");
 } 

   public clearLocalStorage() {
 //borro el vble almacenado mediante el storage
 sessionStorage.removeItem("correo");
 sessionStorage.removeItem("user");
 sessionStorage.removeItem("foto");
 sessionStorage.removeItem("userid");
  sessionStorage.removeItem("rol");
  
 console.log("Adios: ");
 } 


  public userLoggedIn(){
 var resultado = false;
 var usuario = sessionStorage.getItem("user");
 if(usuario!=null){
 resultado = true;
 }
return !!sessionStorage.getItem("user");
 }

  public userLogged(){
 var usuario = sessionStorage.getItem("user");
 return usuario;
 }

public rolLogged(): string {
  return sessionStorage.getItem("rol") ?? 'Invitado';
}


public userLoggedFoto(): string {
  return sessionStorage.getItem("foto")!;
}


 public idLogged(){
 var id = sessionStorage.getItem("userid");
 return id;
 }
}
