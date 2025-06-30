import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioLoginService } from '../../../services/seviceUsuarioLogin/usuario-login.service';
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service';

declare const google: any;


@Component({
  selector: 'app-header-home',
  imports: [RouterLink,FormsModule, CommonModule],
  standalone: true,
  providers: [],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent implements OnInit {
  ngOnInit(): void {
  }


  constructor(private router: Router,
    public loginService: LoginFinalService
  ){
    
  }
  
  RegistrarUsuario(){
      this.router.navigate(['/register']);
  }

   logout(){
    this.loginService.clearLocalStorage();
    this.router.navigate(['/home']);
 }

 userEsAdmin(): boolean {
  return this.loginService.rolLogged() === 'Admin';
}

 userEsSocio(): boolean {
  return this.loginService.rolLogged() === 'Usuario';
}




}
