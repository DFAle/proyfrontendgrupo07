import { Component, NgZone, OnInit } from '@angular/core';
import { Usuariofinal } from '../../../models/Usuariofinal/usuariofinal';
import { CommonModule } from '@angular/common';
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare const google:any;


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
    usuario: Usuariofinal = new Usuariofinal();
    msglogin: string = '';
    returnUrlHome!: string;
    returnUrlAdmin!: string;

  userform = {
    login: '', // Campo combinado para usuario o email
    password: ''
  };

     ngOnInit(): void {
    // Carga el script de Google GSI (Google Sign-In)
    this.loadGoogleScript();
// 'bind(this)' asegura que 'this' dentro de handleCredentialResponse se refiera alcomponente.
   (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);
    this.returnUrlHome = this.route.snapshot.queryParams['returnUrl'] || '/home'
    this.returnUrlAdmin = '/admin/homeAdmin';
  }

  
    constructor(
    private loginService: LoginFinalService,
    private router: Router,
    private ngZone: NgZone,private route: ActivatedRoute
  ) {}




  login() {
     // Validación básica
    if (!this.userform.login || !this.userform.password) 
      this.msglogin = 'Por favor ingrese usuario y contraseña';
    else{
       this.loginService.loginNormal(this.userform.login, this.userform.password).subscribe(
      (result) => {
        console.log(result);
        if (result.status === 1) {
          this.loginService.almacenarDatos(result.username, result.foto, result.correo, result.rol, result.userid );
          console.log(this.loginService.almacenarDatos);
            this.navegacion(result.rol);
        } else {
          this.msglogin = "Credenciales incorrectas";
        }
      },
      (error) => {
        this.msglogin = "Error de conexión con el servidor";
      }
    );
    } 
  }


  navegacion(rol:string){
      if(rol === "Admin"){
        this.router.navigate([this.returnUrlAdmin])
      }else{
        this.router.navigate([this.returnUrlHome])
      }
    }
    

  togglePassword() {
  this.showPassword = !this.showPassword;
  const passwordField = document.querySelector('[name="password"]') as HTMLInputElement;
  if (passwordField) {
    passwordField.type = this.showPassword ? 'text' : 'password';
  }
}

  cancelar() {
    this.router.navigate(['/home']);
  }

 
  private loadGoogleScript(): void {
const script = document.createElement('script');
script.src = 'https://accounts.google.com/gsi/client';
script.async = true;
script.defer = true;
document.head.appendChild(script);
}

/**
* Maneja la respuesta de credenciales de Google después de un inicio de sesión exitoso.
* Contiene el token JWT con la información del usuario.
* @param response El objeto de respuesta de credenciales de Google.
*/
handleCredentialResponse(response: any): void {
// 'ngZone.run' asegura que los cambios y actualizaciones de Angular se detecten.
this.ngZone.run(() => {
console.log('Token JWT ID codificado:', response.credential);
// Decodifica el token JWT para obtener la información del usuario.
const decodedToken = this.decodeJwtResponse(response.credential);
console.log('Información de usuario decodificada (JSON):', decodedToken);
this.loginService.almacenarDatos(decodedToken.name, decodedToken.picture,decodedToken.email, decodedToken.role, decodedToken.id);
this.router.navigateByUrl(this.returnUrlHome)
});
}

/**
* Decodifica un token JWT para extraer su payload (el JSON con la información).
*/
private decodeJwtResponse(token: string): any {
const base64Url = token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));
return JSON.parse(jsonPayload);

}



}
