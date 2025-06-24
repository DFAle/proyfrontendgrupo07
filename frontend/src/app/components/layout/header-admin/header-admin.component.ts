import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceLoginAdminService } from '../../../services/servicioLoginAdmin/service-login-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-admin',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {

    constructor(private router: Router,
    public loginService: ServiceLoginAdminService
  ){
    
  }


   logout(){
 this.loginService.logout();
  this.router.navigate(['/loginAdmin']);
 }
}
