import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-actividad-listado',
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-listado.component.html',
  styleUrl: './actividad-listado.component.css',
})
export class ActividadListadoComponent {
  actividades: Array<Actividad>;
  constructor(private router: Router, private activateRouter: ActivatedRoute, private actividadService: ActividadService) {
    this.actividades = new Array<Actividad>();
    this.getActividad()
  }

  agregarActividad() {
    this.router.navigate(['register-actividad', '0']);
  }

  getActividad(): void {
    this.actividadService.consumirActividad().subscribe({
      next: (result: any[]) => {
        this.actividades = result.map((element: any) => {
          const vactividad = Object.assign(new Actividad(), element);

          const profesor = Array.isArray(element.profesor) && element.profesor.length > 0
            ? element.profesor[0]
            : null;

          vactividad.profesor = profesor || {};
          return vactividad;
        });
      },
      error: (error) => {
        console.error('Error al obtener actividades', error);
      }
    });
  }

  editarActividad(actividades: Actividad) {
    this.router.navigate(['register-actividad', actividades._id]);
  }
}
