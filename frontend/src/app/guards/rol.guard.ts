import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginFinalService } from '../services/LoginFinal/login-final.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private loginService: LoginFinalService, private router: Router) {}

  canActivate(): boolean {
    const rol = this.loginService.rolLogged();
    if (rol === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/no-autorizado']); // o a la página principal
      return false;
    }
  }
}
