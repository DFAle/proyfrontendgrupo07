import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioLoginService } from '../../../services/seviceUsuarioLogin/usuario-login.service';

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
    this.loadGoogleScript();
  }


  constructor(private router: Router,
    public loginService: UsuarioLoginService
  ){
    
  }

  private loadGoogleScript(): void {
const script = document.createElement('script');
script.src = 'https://accounts.google.com/gsi/client';
script.async = true;
script.defer = true;
document.head.appendChild(script);
}



  RegistrarUsuario(){
      this.router.navigate(['/register']);
  }

   logout(){
    this.loginService.clearLocalStorage();
    this.performGoogleLogout();
  //this.router.navigate(['/home']);
 }

performGoogleLogout(): void {
  
    
    // 2. Deshabilitar auto-login
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
      
      // Opcional: Intentar revocar token (puede fallar en desarrollo)
      try {
        google.accounts.id.revoke("507844326766-rjnhpt5o8moqa1hlls7u4796oohbgo4o.apps.googleusercontent.com", 
          (response: any) => {
            console.log('Respuesta de revocación:', response);
        });
      } catch (error) {
        console.warn('Error al revocar token (normal en desarrollo):', error);
      }
    }
    
  }




}
