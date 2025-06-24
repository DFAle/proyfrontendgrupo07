import { Component } from '@angular/core';
import { Admin } from '../../../../models/Admin/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLoginAdminService } from '../../../../services/servicioLoginAdmin/service-login-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  logout() {
   throw new Error('Method not implemented.');
 }

 userform: Admin = new Admin(); //usuario mapeado al formulario
 returnUrl!: string;
 msglogin!: string; // mensaje que indica si no paso el loguin
 constructor(
 private route: ActivatedRoute,
 private router: Router,
 public loginService: ServiceLoginAdminService // Asegúrate de importar el servicio correcto
 ) {
 }
 ngOnInit() {
 this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
 }
 login() {
 this.loginService.login(this.userform.usuario, this.userform.contrasenia)
 .subscribe(
 (result) => {
 var user = result;
 if (user.status == 1){
 //guardamos el user en cookies en el cliente
 sessionStorage.setItem("user", user.username);
 sessionStorage.setItem("userid", user.userid);
 sessionStorage.setItem("perfil", user.perfil);
 console.log("Usuario logueado correctamente");
 //redirigimos a home o a pagina que llamo
 this.router.navigateByUrl(this.returnUrl);
 } else {
 //usuario no encontrado muestro mensaje en la vista
 this.msglogin="Credenciales incorrectas..";
 }
 },
 error => {
 alert("Error de conexion");
 console.log("error en conexion");
 console.log(error);
 
 });
 }

 cancelar() {
  this.router.navigate(['/home']);
}
}
