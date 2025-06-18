import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FormSocioComponent } from './components/forms/form-socio/form-socio.component';
import { FormAsistenciaComponent } from './components/forms/form-asistencia/form-asistencia.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:FormSocioComponent},
    {path: 'registrarAsistencia',component:FormAsistenciaComponent}
];
