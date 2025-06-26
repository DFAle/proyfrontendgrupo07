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
import { LoginAdminComponent } from './components/auth/admin/login-admin/login-admin.component';
import { ProfesorListadoComponent } from './components/Pages/admin/pages/profesor-listado/profesor-listado.component';
import { FormProfesorComponent } from './components/forms/form-profesor/form-profesor.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register/:id',component:FormSocioComponent},
    {path:'register-actividad/:id',component:FormActividadComponent},
    {path:'register-profesor/:id',component:FormProfesorComponent},
    
    //Configuracion de las rutas de la pagina HOME
    {
        path: 'home',
        component: IndexComponent,
        children: [
            {path: '', component: PrincipalComponent, pathMatch: 'full'},
            {path: 'actividad', component: ActividadComponent},
            {path: 'profesor', component: ProfesorComponent},
        ]
    },
 //{path: 'loginAdmin', component: LoginAdminComponent}, 
    {
        path: 'admin',
        component: IndexAdminComponent,
        children: [
            {path: '', component: AdministradorComponent, pathMatch: 'full'},
            {path:'actividad-listado',component:ActividadListadoComponent},
            //{path: 'personal-administrativo', component: PersonalAdministrativoComponent},
            //{path: 'personal-mesa', component: PersonalMesaComponent},
            {path: 'personal-mesa/registrarAsistencia',component:FormAsistenciaComponent},
            {path: 'usuario-listado', component: UsuarioListadorComponent},
            {path: 'profesor-listado', component: ProfesorListadoComponent},
                {path:'login-admin',component:LoginAdminComponent}

            
        ]
    },

    // Se pone a home por defecto cada vez que se inicializa el proyecto
   {path:'**',pathMatch:'full',redirectTo:'home'}
];
