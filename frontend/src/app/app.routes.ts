import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FormSocioComponent } from './components/forms/form-socio/form-socio.component';
import { FormAsistenciaComponent } from './components/forms/form-asistencia/form-asistencia.component';
import { IndexComponent } from './components/Pages/home/index/index.component';
import { PrincipalComponent } from './components/Pages/home/page/principal/principal.component';
import { ActividadComponent } from './components/Pages/home/page/actividad/actividad.component';
import { ProfesorComponent } from './components/Pages/home/page/profesor/profesor.component';
import { UsuarioListadorComponent } from './components/Pages/usuario-listador/usuario-listador.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:FormSocioComponent},
    {path: 'registrarAsistencia',component:FormAsistenciaComponent},
    
    //Configuracion de las rutas de la pagina HOME
    {
        path: 'home',
        component: IndexComponent,
        children: [
            {path: '', component: PrincipalComponent, pathMatch: 'full'},
            {path: 'actividad', component: ActividadComponent},
            {path: 'profesor', component: ProfesorComponent},
            {path: 'usuarioList', component: UsuarioListadorComponent}
        ]
    },

    // Se pone a home por defecto cada vez que se inicializa el proyecto
   // {path:'**',pathMatch:'full',redirectTo:'home'}
];
