import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/layout/footer/footer.component"; //Después borrar esto
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from "./components/layout/header-home/header-home.component";
import { filter, map, Observable } from 'rxjs';
import { HeaderAdminComponent } from './components/layout/header-admin/header-admin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderAdminComponent, FooterComponent,
    HeaderHomeComponent], //Despues borrar el import de login
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  mostrarHeader$: Observable<boolean>;
  mostrarHeaderHome$: Observable<boolean>;

  constructor(private router: Router) {

    this.mostrarHeader$ = this.router.events.pipe(
  filter((event): event is NavigationEnd => event instanceof NavigationEnd),
  map((event: NavigationEnd) => {
    const adminRoutes = [
      '/admin',
      '/admin/personal-administrativo',
      '/admin/personal-mesa',
      '/admin/usuario-listado',
      '/admin/personal-mesa/registrarAsistencia',
      '/admin/actividad-listado',
      '/admin/profesor-listado',
      '/admin/homeAdmin',
      '/admin/actividad-lista',
      '/admin/register',
      '/admin/register-actividad',
      '/admin/register-profesor',
      '/admin/lista-pagos'
    ];
    return adminRoutes.some(path => event.urlAfterRedirects.startsWith(path));
  })
);


this.mostrarHeaderHome$ = this.router.events.pipe(
  filter((event): event is NavigationEnd => event instanceof NavigationEnd),
  map((event: NavigationEnd) => {
    const homeRoutes = [
      '/home',
      '/home/actividad',
      '/home/profesor',
      '/home/register',
      '/home/register-actividad',
      '/home/register-profesor',
      '/home/login',
      '/home/asistencias',
      '/home/nuevo-usuario',
      '/home/pago/exitoso',
      '/home/mi-actividad'
    ];
    const pathOnly = event.urlAfterRedirects.split('?')[0]; // Quitamos los parámetros
    return homeRoutes.some(path => pathOnly.startsWith(path));
  })
);


  }

  ngOnInit(): void {
  }



}

export class App {
  title = 'frontend';
}
