import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceLoginAdminService } from '../../../services/servicioLoginAdmin/service-login-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioLoginService } from '../../../services/seviceUsuarioLogin/usuario-login.service';

@Component({
  selector: 'app-header-home',
  imports: [RouterLink,FormsModule, CommonModule],
  standalone: true,
  providers: [],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

  constructor(private router: Router,
    public loginService: UsuarioLoginService
  ){
    
  }
  RegistrarUsuario(){
      this.router.navigate(['/register']);
  }

   logout(){
 this.loginService.logout();
  this.router.navigate(['/admin/google-login']);
 }
}
