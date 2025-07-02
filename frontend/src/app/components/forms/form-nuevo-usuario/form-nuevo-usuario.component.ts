import { Component } from '@angular/core';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { ServicioRolService } from '../../../services/servicioRol/servicio-rol.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuarios/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service';

@Component({
  selector: 'app-form-nuevo-usuario',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form-nuevo-usuario.component.html',
  styleUrl: './form-nuevo-usuario.component.css'
})
export class FormNuevoUsuarioComponent {

  usuario: Usuario;
  msglogin: string = '';
  valido= {
    emailValido: false,
    usuarioValido: false
  }


  constructor(
    private servicioUsuario: ServicioUsuarioService,
    private servicioRol: ServicioRolService,
    private router: Router,
    private usuarioLogin: LoginFinalService
  ) {
    this.usuario = new Usuario();

    // Asignar automáticamente el rol "Usuario"
    this.servicioRol.getRoles().subscribe((roles) => {
      const rolUsuario = roles.find((r: any) => r.tipo === 'Usuario');
      if (rolUsuario) {
        this.usuario.rol = rolUsuario;
      } else {
        console.error('Rol "Usuario" no encontrado');
      }
    });
  }

  RegistrarUsuario() {
 

    this.usuarioLogin.verificarUsuario(this.usuario.username).subscribe((result) => {
      console.log(result.registrado);
      if (result.registrado) {
        this.msglogin = "El usuario ya está registrado, ingrese otro";
        this.valido.usuarioValido = result.registrado;
      }
    });

    this.usuarioLogin.verificarUsuario(this.usuario.correo).subscribe((result) => {
      console.log(result.registrado);
   if (result.registrado) {
        this.msglogin = "El correo ya está registrado, ingrese otro";
        this.valido.emailValido = result.registrado;
      }
    });

    if(!this.valido.usuarioValido && !this.valido.emailValido){

    console.log(this.usuario)
    this.servicioUsuario.addUsuario(this.usuario).subscribe((result) => {
      console.log(result);
      if (result.status == 1) {
        alert('Te registraste correctamente');
        this.router.navigate(['/home/login']);
      }
    });
  }

}


  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

cancelar() {
  this.router.navigate(['/home']);
}
}
