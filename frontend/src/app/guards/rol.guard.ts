import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginFinalService } from '../services/LoginFinal/login-final.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private loginService: LoginFinalService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const rolUsuario = this.loginService.rolLogged();
const rolesPermitidos = route.data['roles'] as string[];

if (rolesPermitidos.includes(rolUsuario)) {
  return true;
}

this.router.navigate(['/home']);
return false;
  }
}
