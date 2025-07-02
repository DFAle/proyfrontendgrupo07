import { Routes } from '@angular/router';
import { FormSocioComponent } from './components/forms/form-socio/form-socio.component';
import { FormAsistenciaComponent } from './components/forms/form-asistencia/form-asistencia.component';
import { IndexComponent } from './components/Pages/home/index/index.component';
import { PrincipalComponent } from './components/Pages/home/page/principal/principal.component';
import { ActividadComponent } from './components/Pages/home/page/actividad/actividad.component';
import { ProfesorComponent } from './components/Pages/home/page/profesor/profesor.component';
import { UsuarioListadorComponent } from './components/Pages/admin/pages/usuario-listador/usuario-listador.component';
import { IndexAdminComponent } from './components/Pages/admin/index-admin/index-admin.component';
import { AdministradorComponent } from './components/Pages/admin/pages/administrador/administrador.component';
import { ActividadListadoComponent } from './components/Pages/admin/pages/actividad-listado/actividad-listado.component';
import { FormActividadComponent } from './components/forms/form-actividad/form-actividad.component';
import { ProfesorListadoComponent } from './components/Pages/admin/pages/profesor-listado/profesor-listado.component';
import { FormProfesorComponent } from './components/forms/form-profesor/form-profesor.component';

import { LoginComponent } from './components/auth/login/login.component';
import { FormUsuarioComponent } from './components/forms/form-usuario/form-usuario.component';
import { NoAutorizadoComponent } from './components/no-autorizado/no-autorizado/no-autorizado.component';
import { RolGuard } from './guards/rol.guard';
import { FormNuevoUsuarioComponent } from './components/forms/form-nuevo-usuario/form-nuevo-usuario.component';
import { PagoExitosoComponent } from './components/Pago/pago-exitoso/pago-exitoso.component';
import { PagoPendienteComponent } from './components/Pago/pago-pendiente/pago-pendiente.component';
import { PagoFallidoComponent } from './components/Pago/pago-fallido/pago-fallido.component';
import { MiActividadComponent } from './components/Pages/home/page/mi-actividad/mi-actividad.component';

export const routes: Routes = [
  //Configuracion de las rutas de la pagina HOME
  {
    path: 'home',
    component: IndexComponent,
    children: [
      { path: '', component: PrincipalComponent, pathMatch: 'full' },

      {
        path: 'actividad',
        component: ActividadComponent,
        canActivate: [RolGuard],
        data: { roles: ['Admin', 'Usuario', 'Invitado'] },
      },
      {
        path: 'profesor',
        component: ProfesorComponent,
        canActivate: [RolGuard],
        data: { roles: ['Admin', 'Usuario', 'Invitado'] },
      },
      {
        path: 'asistencias',
        component: FormAsistenciaComponent,
        canActivate: [RolGuard],
        data: { roles: ['Admin', 'Personal Mesa de Entrada'] },
      },
      {
        path: 'nuevo-usuario',
        component: FormNuevoUsuarioComponent,
        canActivate: [RolGuard],
        data: { roles: ['Invitado'] },
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [RolGuard],
        data: { roles: ['Invitado'] },
      },

      { path: 'pago/exitoso', component: PagoExitosoComponent },
      { path: 'pago/pendiente', component: PagoPendienteComponent },
      { path: 'pago/fallido', component: PagoFallidoComponent },
      {
        path: 'mi-actividad',
        component: MiActividadComponent,
        canActivate: [RolGuard],
        data: { roles: ['Usuario'] },
      },
    ],
  },

  {
    path: 'admin',
    component: IndexAdminComponent,
    canActivateChild: [RolGuard],
    data: { roles: ['Admin', 'Personal Administrativo'] },
    children: [
      { path: 'actividad-lista', component: ActividadListadoComponent },
      { path: 'homeAdmin', component: AdministradorComponent },
      { path: 'usuario-listado', component: UsuarioListadorComponent },
      { path: 'profesor-listado', component: ProfesorListadoComponent },
      { path: 'register/:id', component: FormSocioComponent },
      { path: 'register-actividad/:id', component: FormActividadComponent },
      { path: 'register-profesor/:id', component: FormProfesorComponent },
      { path: 'no-autorizado', component: NoAutorizadoComponent },
    ],
  },
  // Se pone a home por defecto cada vez que se inicializa el proyecto
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
