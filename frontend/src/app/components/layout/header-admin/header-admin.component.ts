import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service';

@Component({
  selector: 'app-header-admin',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {

    constructor(private router: Router, public loginService: LoginFinalService
  ){
    
  }

   RegistrarUsuario(){
      this.router.navigate(['/register']);
  }

     logout(){
    this.loginService.clearLocalStorage();
    this.router.navigate(['/home']);
 }

 mostrarBotonHome(): boolean {
  const rol = this.loginService.rolLogged();
  return rol !== 'Personal Administrativo';
}
  


 }


 

