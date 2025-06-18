import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FormSocioComponent } from './components/forms/form-socio/form-socio.component';
import { PersonalMesaComponent } from './components/Pages/personal-mesa/personal-mesa.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:FormSocioComponent},
    {path:'personal-mesa',component:PersonalMesaComponent}
];
