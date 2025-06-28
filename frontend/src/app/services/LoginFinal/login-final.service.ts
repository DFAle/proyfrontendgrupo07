import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginFinalService {

  hostBase: string;

  constructor(private _http: HttpClient) {
   // this.hostBase = 'http://localhost:3000/api/usuario/';
   this.hostBase = 'https://proybackendgrupo07.onrender.com/api/usuario/';
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
  public estaRegistrado(userform: string): Observable<any> {
    const httpOptions = {
      params : new HttpParams()
      .set('username', userform)
      .set('correo', userform)

    }
    return this._http.get(this.hostBase + '/registrado', httpOptions);
  }

  

   public almacenarDatos(username: string, foto: string,correo:string, rol: string):void  {

console.log(username);
sessionStorage.setItem("correo", correo);
sessionStorage.setItem("user", username);
sessionStorage.setItem("foto", foto);
sessionStorage.setItem("rol", rol);
console.log("Rol del usuario: "+rol);
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

 public rolLogged(): string |  null {
 return sessionStorage.getItem("rol");

 }

 public userLoggedFoto(){
 var foto = sessionStorage.getItem("foto");
 return foto;
 }

 public idLogged(){
 var id = sessionStorage.getItem("userid");
 return id;
 }
}
