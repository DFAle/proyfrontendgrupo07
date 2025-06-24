import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceLoginAdminService } from '../../../services/servicioLoginAdmin/service-login-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    public loginService: ServiceLoginAdminService
  ){
    
  }
  RegistrarUsuario(){
      this.router.navigate(['/register']);
  }

   logout(){
 this.loginService.logout();
  this.router.navigate(['/loginAdmin']);
 }
}
