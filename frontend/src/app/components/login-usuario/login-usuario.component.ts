import { Component } from '@angular/core';
import { LoginFinalService } from '../../services/LoginFinal/login-final.service';
import { Router } from '@angular/router';
import { Usuariofinal } from '../../models/Usuariofinal/usuariofinal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-usuario',
  imports: [FormsModule,CommonModule],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {

  userform: Usuariofinal = new Usuariofinal();
  msglogin: string = '';
  returnUrl: string = '/home';

  constructor(
    private loginService: LoginFinalService,
    private router: Router
  ) {}

  login() {
    this.loginService.login(this.userform.username, this.userform.password).subscribe(
      result => {
        if (result.status === 1) {
          sessionStorage.setItem("user", result.username);
          sessionStorage.setItem("userid", result.userid);
          sessionStorage.setItem("rol", result.rol);
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.msglogin = "Credenciales incorrectas";
        }
      },
      error => {
        this.msglogin = "Error de conexión con el servidor";
      }
    );
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
