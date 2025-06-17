import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user: Usuario = new Usuario();
  mostrarAlerta = false;
  returnUrl!: string;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  public login(): void {
    this.loginService.login(this.user.username, this.user.password).subscribe(
      (result) => {
        var usuario = result;
        if (usuario.status == 1) {
          sessionStorage.setItem('user', usuario.username);
          sessionStorage.setItem('userid', usuario.userid);
          sessionStorage.setItem('rol', usuario.rol);
          console.log(sessionStorage);
        } else {
          this.mostrarAlerta = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
