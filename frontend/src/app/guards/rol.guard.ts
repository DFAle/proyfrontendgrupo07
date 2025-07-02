import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LoginFinalService } from '../services/LoginFinal/login-final.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginFinalService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRol(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRol(route);
  }

  private checkRol(route: ActivatedRouteSnapshot): boolean {
    const rolUsuario = this.loginService.rolLogged();
    const rolesPermitidos = route.parent?.data['roles'] || route.data['roles']; // busca primero en el padre

    if (rolesPermitidos?.includes(rolUsuario)) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
