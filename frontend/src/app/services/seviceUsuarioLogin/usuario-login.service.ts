import { Injectable, NgZone } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UsuarioLoginService {

private readonly clientId = "507844326766-rjnhpt5o8moqa1hlls7u4796oohbgo4o.apps.googleusercontent.com"

  constructor(private ngZone: NgZone) { }

  public login(username: string, foto: string) {
 /**
    const httpOption = {
 headers: new HttpHeaders({
 'Content-Type': 'application/json'
 })
 }
 let body = JSON.stringify({ usuario: username, contrasenia: password });
 console.log(body);
 return this._http.post(this.hostBase + 'login', body, httpOption);
 */
console.log(username);
sessionStorage.setItem("user", username);
sessionStorage.setItem("foto", foto);
 }

  public clearLocalStorage() {
 //borro el vble almacenado mediante el storage
 sessionStorage.removeItem("user");
 sessionStorage.removeItem("foto");
 sessionStorage.removeItem("userid");
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

 public userLoggedFoto(){
 var foto = sessionStorage.getItem("foto");
 return foto;
 }

 public idLogged(){
 var id = sessionStorage.getItem("userid");
 return id;
 }


}
