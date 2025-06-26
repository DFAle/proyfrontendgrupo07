import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceLoginAdminService } from '../../../../../services/servicioLoginAdmin/service-login-admin.service';

@Component({
  selector: 'app-actividad-listado',
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-listado.component.html',
  styleUrl: './actividad-listado.component.css',
})
export class ActividadListadoComponent {
  actividades: Array<Actividad>;
  constructor(private router: Router, private activateRouter: ActivatedRoute, private actividadService: ActividadService, public loginService: ServiceLoginAdminService) {
    this.actividades = new Array<Actividad>();
    this.getActividad()
  }

  agregarActividad() {
    this.router.navigate(['register-actividad', '0']);
  }
  getActividad() {
    this.actividadService.consumirActividad().subscribe((result) => {
      console.log(result);
      this.actividades = []; // Limpiar lista antes de llenarla de nuevo
      result.forEach((element: any) => {
        let vactividad: Actividad = new Actividad();
        Object.assign(vactividad, element);
        vactividad.profesor = Array.isArray(element.profesor) ? element.profesor : element.profesor;
        this.actividades.push(vactividad);
      });
    });
  }

  editarActividad(actividades: Actividad) {
    this.router.navigate(['register-actividad', actividades._id]);
  }
}
