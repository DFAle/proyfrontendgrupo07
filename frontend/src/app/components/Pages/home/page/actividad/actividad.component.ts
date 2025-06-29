import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { LoginFinalService } from '../../../../../services/LoginFinal/login-final.service';

declare var bootstrap: any;

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
})
export class ActividadComponent {
  actividades = Array<Actividad>();
  constructor(private actividadService: ActividadService , public loginService: LoginFinalService) {
    this.actividades = new Array<Actividad>();
    this.getAtividad();
  }

  getAtividad() {
    this.actividadService.consumirActividad().subscribe((result) => {
      console.log(result)
      result.forEach((element: any) => {
        let vactividad: Actividad = new Actividad();
        Object.assign(vactividad, element);
        this.actividades.push(vactividad);
      });
    });
  }

esSocio(): boolean {
  const rol = this.loginService.rolLogged();
  console.log("ROL DEL USUARIO EN COMPONENTE:", rol);
  return rol === 'Usuario';
}

   logout(){
    this.loginService.clearLocalStorage();
 }
}